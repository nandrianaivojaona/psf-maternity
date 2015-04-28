namespace.module('com.freemedforms.gyneacology.consultation.helper', function (exports, require) {

  // Ui vars (retrieved from the ui)
  var motifCombo, motifSelectorListWidget, leftCheck, rightCheck, addButton, pathologySelectorListWidget;
  var htmlItem;
  var motif = new Array();
  var motifSelector = new Array("xx", "fr");
  var pathologySelector = new Array("xx", "fr");

  exports.extend({
    'setupUi': setupUi
  });

                     function setupUi() {
                         getUiElements();
                         createVariableContent();
                         connectUiElements();
                         motifCombo.currentIndex = 0;
                         reTranslateUi();
						 
                     }

                     function createVariableContent() {
                         motif["xx"] = [""
                                         ];
                         motif["fr"] = [
							                "Suivi gynécologique systématique", 
										    "Pathologie précise"
									 ];

                         motifSelector["xx"] = new Array();
                         motifSelector["fr"] = new Array();
						 
                        
						// 0: suivi Gynecologique systematique
						 
                         motifSelector["xx"][0] = [""];
                         motifSelector["fr"][0] = [""];	 
                         
					 // 0: pathologie precise
						 
					 motifSelector["xx"][1] = [""];
                     motifSelector["fr"][1] = [
                                                  "Saignements anormaux", 
							                      "Aménorrhées primaires", 
							                      "Aménorrhées secondaires",  
							                      "Leucorrhées", 
							                      "Algies pelviennes", 
							                      "Eruptions vulvaires", 
							                      "Stérilité primaire", 
							                      "Stérilité secondaire", 
							                      "Pathologie mammaire",
							                      "Troubles de la vie sexuelle"
						                       	  ];


					 //raySelector
				       pathologySelector["xx"] = new Array();
					   PathologySelector["fr"] = new Array();
					   pathologySelector["xx"]= ["First", "Second", "Third", "Fourth", "Fifth"];
					   pathologySelector["fr"]= ["Premier", "Deuxième", "Troisième", "Quatrième", "Cinquième"];
						
                     }

                     function getUiElements() {
                         freemedforms.forms.namespaceInUse = "";
                         var formUi = freemedforms.forms.item("Subs::Gyneacology");
                         freemedforms.forms.namespaceInUse = "Subs::Gyneacology";
                         var ui = formUi.ui();
                         motifCombo = ui.findChild("globalSites");
                         motifSelectorListWidget = ui.findChild("siteSelectorListWidget");
                         pathologySelectorListWidget = ui.findChild("RaySelectorListWidget");
                         leftCheck = ui.findChild("left");
                         rightCheck = ui.findChild("right");
                         addButton = ui.findChild("addButton");
                         htmlItem = freemedforms.forms.item("Gyneacology");
                     }

                     function populatemotifCombo() {
                         motifCombo.clear();
                         freemedforms.uiTools.addItems(motifCombo, mainSites);
                     }

                     function connectUiElements() {
                         freemedforms.forms.languageChanged.connect(this, reTranslateUi);
                         motifCombo['activated(int)'].connect(this, populatemotifSelector);
                         addButton.clicked.connect(this, putSelectionToHtmlEditor);
                     }

                     
                     function reTranslateUi() {
                         if (freemedforms.forms.currentLanguage=="fr") {
                             leftCheck.text = "Gauche";
                             rightCheck.text = "Droite";
                             siteCombo.clear();
                             freemedforms.uiTools.addItems(siteCombo, mainSites["fr"]);
                         } else {
                             leftCheck.text = "Left";
                             rightCheck.text = "Right";
                             siteCombo.clear();
                             freemedforms.uiTools.addItems(siteCombo, mainSites["xx"]);
                         }
                         populateMotifSelector(motifCombo.currentIndex);
                         populatePathologySelector() ;
                         enabledRightLeft();
                     }

                     function populateSiteSelector(row) {
                         freemedforms.uiTools.clear(siteSelectorListWidget);
                         if (freemedforms.forms.currentLanguage=="fr") {
                             freemedforms.uiTools.addItems(siteSelectorListWidget, siteSelector["fr"][row]);
                         } else {
                             freemedforms.uiTools.addItems(siteSelectorListWidget, siteSelector["xx"][row]);
                         }
                         populateRaySelector();
                         enabledRightLeft();
                     }
					
                    function populateRaySelector() {
                        freemedforms.uiTools.clear(raySelectorListWidget);
                        if (siteCombo.currentIndex == 1) {
                            raySelectorListWidget.enabled = true;
                         } else {
                            raySelectorListWidget.enabled = false;
                        }
			if (freemedforms.forms.currentLanguage=="fr") {
                             freemedforms.uiTools.addItems(raySelectorListWidget, raySelector["fr"]);
                         } else {
                             freemedforms.uiTools.addItems(raySelectorListWidget, raySelector["xx"]);
                         }
                     }	
                     
                     function enabledRightLeft() {
                        if (siteCombo.currentIndex > 3) 
                             {leftCheck.enabled = false;
                             rightCheck.enabled = false;}
                         else {leftCheck.enabled = true;
                             rightCheck.enabled = true;} 
                     }
					
                     function putSelectionToHtmlEditor() {
                         // return html code
                         var html = "<span style=\"font-weight:bold;font-size:large;font-variant:small-caps;text-decoration:underline\">" + siteCombo.currentText + "</span><ul title=" + siteCombo.currentText + ">";
                         var selected = freemedforms.uiTools.selectedItems(siteSelectorListWidget);
                         var r_selected = freemedforms.uiTools.selectedItems(raySelectorListWidget);
                         for(var i=0; i < selected.length; i++) {
                             var lat;
                             if  ( (!leftCheck.checked && !rightCheck.checked) || !leftCheck.enabled )
                                 lat = "";
                             else if (rightCheck.checked && !leftCheck.checked)
                                 lat =": "+ rightCheck.text;
                             else if (leftCheck.text && !rightCheck.checked)
                                 lat =": "+ leftCheck.text;
                             else lat=": "+ leftCheck.text+" + "+rightCheck.text;

                             if (siteCombo.currentIndex == 1) {
                                 var quantity = r_selected.join(" + ");
                                 html += "<li><b>"+ quantity + " " + selected[i] + "</b> " + lat + "</li>";
                             } else {
                                 html += "<li><b>" + selected[i] + "</b> " + lat + "</li>";
                             }
                         }
                         html += "</ul>";
                         htmlItem.currentText = htmlItem.currentText + html;
                     }

});

// Setup Ui
namespace.com.freemedforms.xray.prescription.helper.setupUi();
