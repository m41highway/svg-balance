define(["./balance", "./d3.min", "css!./QSenseBalance.css"],
    function(template) {
        "use strict";
        //palette de couleur par défaut
        var palette = [
        "#b0afae",
        "#7b7a78",
        "#545352",
        "#4477aa",
        "#7db8da",
        "#b6d7ea",
        "#46c646",
        "#f93f17",
        "#ffcf02",
        "#276e27",
        "#ffffff",
        "#000000"
        ];

        //palette de sélection couleur 1
        var ColorArc1 = {
        ref: "Arc1",
        type: "integer",
        component: "color-picker",
        label: "Premier arc",
        defaultValue: 3
        };
        //palette de sélection couleur 2
        var ColorArc2 = {
        ref: "Arc2",
        type: "integer",
        component: "color-picker",
        label: "Second arc",
        defaultValue: 2
        };
        
        var limite1 = {
                ref: "limite1",
                type: "integer",
                label: "Limite arc 1",
                expression: "always",
                defaultValue: 100
            };
        var limite2 = {
                ref: "limite2",
                type: "integer",
                label: "Limite arc 2",
                expression: "always",
                defaultValue: 100
            };
        
        var imageGauge = {
        label: "Icon de la jauge",
        component: "media",
        ref: "iconGauge",
        layoutRef: "myMedia",
        type: "string"
        };
        
        var affichageMesure1 = {
                    type: "boolean",
                    component: "switch",
                    label: "Afficher la mesure 1",
                    ref: "affichage1",
                    options: [{
                        value: true,
                        label: "On"
                    }, {
                        value: false,
                        label: "Off"
                    }],
                    defaultValue: true
                };
        
        var affichageMesure2 = {
                    type: "boolean",
                    component: "switch",
                    label: "Afficher la mesure 2",
                    ref: "affichage2",
                    options: [{
                        value: true,
                        label: "On"
                    }, {
                        value: false,
                        label: "Off"
                    }],
                    defaultValue: true
                };

        //définition de l'objet
        return {
        initialProperties: {
            qHyperCubeDef: {
            qDimensions: [],
            qMeasures: [],
            qInitialDataFetch: [{
                qWidth: 2,
                qHeight: 50
            }]
            }
        },
        definition: {
            type: "items",
            component: "accordion",
            items: {
            measures: {
                uses: "measures",
                min: 1,
                max: 2
            },
            Setting: {
                uses: "settings",
                items: {
                Colors: {
                    ref: "Color",
                    type: "items",
                    label: "Affichage",
                    items: {
                    Colors1: ColorArc1,
                    Colors2: ColorArc2,
                    MediaGauge: imageGauge,
                                        affichage1: affichageMesure1,
                                        affichage2: affichageMesure2
                    }
                },
                                Limite:{
                                    ref: "limite",
                                    type: "items",
                                    label: "Limites",
                                    items:{
                                        limite1: limite1,
                                        limite2: limite2
                                    }
                            }
                }
            }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },

        return {
            paint: function($element, layout) {

                var width = $element.width();
                var height = $element.height();

                var id = "container_" + layout.qInfo.qId;

                if (document.getElementById(id)) {
                    $("#" + id).empty();
                } else {
                    $element.append($('<div />').attr("id", id).attr("class", "viz").width(width).height(height));
                }

                var tooLong = ' ';
                console.log(hc.qMeasureInfo[0].qFallbackTitle.length);
                if (hc.qMeasureInfo[0].qFallbackTitle.length > 13) {
                tooLong = '... ';
                }

                //recup de la valeur de la mesure
                var measureName =  hc.qMeasureInfo[0].qFallbackTitle.substr(0, 13) + tooLong + hc.qDataPages[0].qMatrix[0][0].qText;
                var value = hc.qDataPages[0].qMatrix[0][0].qNum;

                if (hc.qDataPages[0].qMatrix[0].length > 1) {
                    tooLong = ' ';
                if (hc.qMeasureInfo[1].qFallbackTitle.length > 13){
                    tooLong = '... ';
                }

                var value2 = hc.qDataPages[0].qMatrix[0][1].qNum;
                var measureName2 = hc.qMeasureInfo[1].qFallbackTitle.substr(0, 13) + tooLong + hc.qDataPages[0].qMatrix[0][1].qText;
                }

                //couleur arc 1 et 2
                var colorAcr1 = palette[layout.Arc1];
                var colorAcr2 = palette[layout.Arc2];




                // input data
                var arraySide1 = [0, 1, 1, 1, 0, 1 ,0]
                var arrayLabel1 = ["Advice", "Waiting Time", "Service", "Explanation", "Atmosphere", "Welcome", "Farewell"]
                Balance.addBoxes(arraySide1, arrayLabel1);

                //recup des données
                var hc = layout.qHyperCube;
                //recup de la zone d'affichage
                var div = document.getElementById(id);

                // kick off
                Balance.render(div);
            };
        };
    }
);