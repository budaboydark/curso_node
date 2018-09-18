var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {
    var connection = dbConnection()
    app.get('/noticias', function(req, res) {
        connection.query("SELECT * FROM clientes", function(erro, result) {
            res.render('noticias/noticias', { noticias: result })
        })
    })
}