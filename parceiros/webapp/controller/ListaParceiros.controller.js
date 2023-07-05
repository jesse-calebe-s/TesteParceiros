sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zapp.parceiros.controller.ListaParceiros", {
            onInit: function () {
            },
            aoSelecionarParceiro: function (oEvent){
                // Resgatar o controle que disparou o evento (ColumListItem da xml view)
                let oColumnListItem = oEvent.getSource();
                
                //acessar o caminho do modelo em que o item que foi clicado está associado
                //o método getBindingContext importa o nome do modelo.
                let oContexto = oColumnListItem.getBindingContext();

                //acessa os dados do modelo em forma de objeto para acessar a propriedade CodigoParceiro
                let oDadosModelo = oContexto.getObject();

                //acessa o valor da propriedade CodigoParceiro
                let sCodigoParceiro = oDadosModelo.CodigoParceiro;

                //acessa o roteador com as rotas do manifest
                let oRoteador = this.getOwnerComponent().getRouter();

                oRoteador.navTo("RouteParceiro", {
                    CodigoParceiro: sCodigoParceiro
                })
            }
        });
    });
