var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {
    var connection = dbConnection()
    app.get('/planilhas', function(req, res) {
        res.render('planilhas/planilha')

        // connection.query("SELECT * FROM contas_pagar", function (erro, result) {
        //     res.render('contas/contas', { contas: result })
        // })
    })
}