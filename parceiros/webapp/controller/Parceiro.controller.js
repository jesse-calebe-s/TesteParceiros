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
                // acessa a rota de detalhe RouteParceiro do manifest.json e chama a função rotaDetalhe para ler a URL
                let oRouter = this.getOwnerComponent().getRouter();
                let oRotaDesejada = oRouter.getRoute("RouteParceiro");
                
                oRotaDesejada.attachPatternMatched(this.rotaDetalhe, this);

                //gerando um modelo para controlar a edição dos campos de input
                let oModel = new JSONModel();
                oModel.setProperty("/habilitado", false); //declara uma propriedade "habilitado" e marca como falsa
                this.getView().setModel(oModel, "editavel");

                oModel = new JSONModel();
                oModel.setProperty("/botaoEdit", true);
                this.getView().setModel(oModel, "visibilidade");

            },
            rotaDetalhe: function (oEvent){
                let sCodigoParceiro = oEvent.getParameter("arguments").CodigoParceiro;

                let oModel = this.getOwnerComponent().getModel();

                let sCaminho = oModel.createKey("/ParceirosSet", {
                    CodigoParceiro: sCodigoParceiro
                });
                
                this.getView().bindElement(sCaminho);
            },
            onEditButton: function (oEvent) {
                this._ConfiguraEdicao(true);
            },
            onCancelButton: function (oEvent){
                this._ConfiguraEdicao(false);
            },
            _ConfiguraEdicao: function(bHabilitaEdicao){
                let oModelEditavel = this.getView().getModel("editavel");
                let oModelVisibilidade = this.getView().getModel("visibilidade");

                oModelEditavel.setProperty("/habilitado", bHabilitaEdicao);

                if (bHabilitaEdicao === true){
                    oModelVisibilidade.setProperty("/botaoEdit", false);
                }else{
                    oModelVisibilidade.setProperty("/botaoEdit", true);
                }
            }
        });
    });
