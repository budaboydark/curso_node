var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {
    var connection = dbConnection()
    app.get('/contas', function(req, res) {
        connection.query("SELECT * FROM contas_pagar", function(erro, result) {
            res.render('contas/contas', { contas: result })
        })
    })
}