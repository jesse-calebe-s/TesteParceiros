sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	JSONModel,
	MessageToast) {
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

                oModel = new JSONModel();
                oModel.setProperty("/visibilidade", false);
                this.getView().setModel(oModel, "criacao");

                //habilitar alterações pelo usuário
                this.getOwnerComponent().getModel().setDefaultBindingMode('TwoWay');

            },
            rotaDetalhe: function (oEvent){
                let sCodigoParceiro = oEvent.getParameter("arguments").CodigoParceiro;

                let oModel = this.getOwnerComponent().getModel();

                let sCaminho = oModel.createKey("/ParceirosSet", {
                    CodigoParceiro: sCodigoParceiro
                });
                
                this.getView().bindElement(sCaminho);

                let oModelCriacao = this.getView().getModel("criacao");

                if (sCodigoParceiro === 'novo_parc') {
                    oModelCriacao.setProperty("/visibilidade", true);
                    this._ConfiguraEdicao(true);
                }else{
                    this._ConfiguraEdicao(false);
                    oModelCriacao.setProperty("/visibilidade", false)
                }
            },
            onEditButton: function (oEvent) {
                this._ConfiguraEdicao(true);
            },
            onCancelButton: function (oEvent){
                this.getView().getModel().resetChanges()

                this._ConfiguraEdicao(false);

                let sCaminho = this.getView().getBindingContext().getPath();

                if (sCaminho === "/ParceirosSet('novo_parc')") {
                    let oRoteador = this.getOwnerComponent().getRouter();

                    oRoteador.navTo("RouteListaParceiros", {});
                };
            },
            onSaveButton: function (oEvent){
                let sCaminho = this.getView().getBindingContext().getPath();

                let oModel = this.getOwnerComponent().getModel();

                let oDadosTela = this.getView().getBindingContext().getObject();

                let oInformacoes = {
                    Tipo: oDadosTela.Tipo,
                    Nome1: oDadosTela.Nome1,
                    Nome2: oDadosTela.Nome2,
                    TermoDePesquisa1: oDadosTela.TermoDePesquisa1,
                    TermoDePesquisa2: oDadosTela.TermoDePesquisa2,
                    Rua: oDadosTela.Rua,
                    NumeroCasa: oDadosTela.NumeroCasa,
                    Bairro: oDadosTela.Bairro,
                    Cidade: oDadosTela.Cidade,
                    Estado: oDadosTela.Estado,
                    Pais: oDadosTela.Pais,
                    Cep: oDadosTela.Cep
                };

                oModel.setHeaders({'X-Requested-With': 'X'});

                if (sCaminho === "/ParceirosSet('novo_parc')") {
                    oInformacoes.CodigoParceiro = oDadosTela.CodigoParceiro;
                    
                    oModel.create("/ParceirosSet", oInformacoes, {
                        success: () => {
                            this._ConfiguraEdicao(false);
                            
                            let oRoteador = this.getOwnerComponent().getRouter();

                            oRoteador.navTo("RouteListaParceiros", {});
                            
                            MessageToast.show('Parceiro criado.');
                        },
                        error: (oError) => {
                            MessageToast.show(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                        }
                    })
                }else{
                    oModel.update(sCaminho, oInformacoes, {
                        success: () => {
                            this._ConfiguraEdicao(false);
                            MessageToast.show('Parceiro atualizado.');
                        },
                        error: (oError) => {
                            MessageToast.show(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                        }
                    });
                }
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
