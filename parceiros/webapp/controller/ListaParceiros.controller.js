sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/MessageToast",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Dialog, DialogType, Button, ButtonType, MessageToast, Text) {
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
                });
            },
            onButtonCriarParceiro: function (oEvent) {
                let oRoteador = this.getOwnerComponent().getRouter();

                oRoteador.navTo("RouteParceiro", {
                    CodigoParceiro: "novo_parc"
                });
            },
            onButtonDeletarParceiro: function (oEvent){
                let oItemSelecionado = this.getView().byId("idTable").getSelectedItem().getBindingContext();

                this.sCaminhoDelete = oItemSelecionado.sPath;
                let sCodigoParceiro = oItemSelecionado.getObject().CodigoParceiro;

                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Deletar",
                        content: new Text({ text: "Tem certeza que deseja deletar o parceiro selecionado?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Sim",
                            press: function () {
                                
                                let oModel = this.getOwnerComponent().getModel();
                                oModel.remove(this.sCaminhoDelete, {
                                    success: () => {
                                        MessageToast.show("Parceiro deletado")
                                    },
                                    error: () => {
                                        MessageToast.show("Erro ao deletar parceiro")
                                    }
                                })

                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancelar",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                };
    
                this.oApproveDialog.open();
            }
        });
    });
