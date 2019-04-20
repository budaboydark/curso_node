module.exports = function(app) {

    app.post('/contas_pagar/atualizar/:id', function(req,res){
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        var post = req.body
        post.id = req.params.id
        post.status = 'S'
        
        contasModel.updateContaPagar(post,connection,function(erro,result){
            if(erro){
                console.log(erro)
                res.render('admin/form_update_conta_pagar', { message: 'Erro ao inserir dados',id : post.id })
            }else{
                contasModel.getContasPagar(post.id, connection,function(erro, result) {                                                            
                    res.redirect('/contas/'+result[0].idcontas+'/pagar')
                })                
                
            }                           
        })
    })

    app.post('/contas_pagar/atualizar/v/:id', function(req,res){
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        var post = req.body
        post.id = req.params.id
        post.status = 'N'
        
        contasModel.updateContaVencimento(post,connection,function(erro,result){
            if(erro){
                console.log(erro)
                res.render('admin/form_update_vencimento_conta_pagar', { message: 'Erro ao inserir dados',id : post.id })
            }else{
                contasModel.getContasPagar(post.id, connection,function(erro, result) {                                                            
                    res.redirect('/contas/'+result[0].idcontas+'/pagar')
                })                
                
            }                           
        })
    })
    app.post('/contas/gravar', function(req,res){
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        var post = req.body        

        contasModel.insertConta(post,connection, function(erro, result) {
            if(req.body.tipo == 'pagar'){
                var id = result.insertId
                var parc = req.body.qtd_parcelas
                dados = {
                    nome: post.conta,
                    valorparcela : post.valor,
                    status: 'N',
                    idcontas: id
                }
                for(var i=1;i <= parc;i++){
                    dados.numeroparcela = i
                    contasModel.insertContasPagar(dados,connection,function(erro,result){
                        console.log(result)
                    })
                }
            }
            if(erro){
                console.log(erro)
                res.render('admin/form_add_conta', { message: 'Erro ao inserir dados' })
            }else{
                res.render('admin/form_add_conta', { message: 'Dados inseridos com sucesso' })
            }                           
        })
    })

    app.get('/contas', function(req, res) {
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        contasModel.getContas(connection, function(erro, result) {            
            res.render('contas/contas', { contas: result })
        })
    })

    app.get('/contas/:id/:tipo', function(req, res) {
        var params = req.params;
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        if(params.tipo == 'pagar'){
            var format = require('date-format')
            var numeral = require('numeral')
            contasModel.getContaPagar(params.id, connection, function(erro, result) {
                res.render('contas/contas_pagar', { contas: result, format: format, numeral: numeral })
            })
        }else if(params.tipo == 'receber'){
            contasModel.getContaReceber(params.id, connection, function(erro, result) {
                res.render('contas/contas_receber', { contas: result })
            })
        }
    })

}