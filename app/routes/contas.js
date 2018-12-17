// var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {

    app.get('/contas', function(req, res) {
        var contasModel = app.app.models.contasModel
        var connection = app.config.dbConnection();
        contasModel.getContas(connection, function(erro, result) {
            res.render('contas/contas', { contas: result })
        })
    })

    app.get('/contas/:id', function(req, res) {
        var params = req.params;
        var contasModel = app.app.models.contasModel
        var connection = app.config.dbConnection();
        contasModel.getConta(params.id, connection, function(erro, result) {
            res.render('contas/contas', { contas: result })
        })
    })

}