// var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {
    app.get('/contas', function(req, res) {

        var contasModel = app.app.models.contasModel
        var connection = app.config.dbConnection();
        contasModel.getContas("SELECT * FROM contas_pagar", connection, function(erro, result) {
            // res.jsonp({
            //     contas: result
            // }).end()
            res.render('contas/contas', { contas: result })
        })





    })
	app.get('/teste',function (req,res){
		res.render('admin/form_add_noticia')
	})

    /*
    var connection = dbConnection()
    app.get('/contas', function(req, res) {
        connection.query("SELECT * FROM contas_pagar", function(erro, result) {
            res.render('contas/contas', { contas: result })
        })
    })
    */
}
