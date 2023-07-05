sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zapp.parceiros.controller.Parceiro", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                let oRotaDesejada = oRouter.getRoute("RouteParceiro");
                
                oRotaDesejada.attachPatternMatched(this.rotaDetalhe, this);
            },
            rotaDetalhe: function (oEvent){
                let sCodigoParceiro = oEvent.getParameter("arguments").CodigoParceiro;

                let oModel = this.getOwnerComponent().getModel();

                let sCaminho = oModel.createKey("/ParceirosSet", {
                    CodigoParceiro: sCodigoParceiro
                });
                
                this.getView().bindElement(sCaminho);
            }
        });
    });
