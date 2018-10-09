var dbConnection = require('../config/dbConnection')

module.exports = function(sql, callback) {
    var connection = dbConnection()

    connection.query(sql, function(erro, result) {
        if (erro) {
            return callback("texto")
        } else {
            return callback("texto")
        }
    })
}