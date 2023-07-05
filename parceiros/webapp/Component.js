/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zapp/parceiros/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("zapp.parceiros.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                //declara o modelo de Layout
                let oModel = new JSONModel();

                //associa o modelo no component.js com o nome "layout"
                this.setModel(oModel, "layout");

                // enable routing
                this.getRouter().initialize();

                //anexa o evento beforeRouteMatched e faz ele chamar o evento aoExecutarRota com o contexto
                // para o component.js 
                this.getRouter().attachBeforeRouteMatched(this.aoExecutarRota, this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            aoExecutarRota: function (oEvent){
                //passa o layout de duas colunas para o modelo
                let oLayout = this.getModel("layout");

                //acessa o nome da rota
                let sRota = oEvent.getParameter("name");

                if (sRota === "RouteParceiro"){
                    //cria e/ou altera a propriedade passada com o layout de duas colunas 
                    //nome da propriedade vai ter a "/" porque � um caminho absoluto 
                    oLayout.setProperty("/visual", sap.f.LayoutType.TwoColumnsMidExpanded );
                }
                else if (sRota === "RouteListaParceiros"){

                    //cria e/ou altera a propriedade passada com o layout de uma coluna apenas
                    //nome da propriedade vai ter a "/" porque � um caminho absoluto 
                    oLayout.setProperty("/visual", sap.f.LayoutType.OneColumn );
                }
            }
        });
    }
);