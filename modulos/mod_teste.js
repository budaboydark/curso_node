var dbConnection = require('../config/dbConnection')


exports.executar = (sql) => {
    var connection = dbConnection()
    return new Promise((resolve, reject) => {
        connection.query(sql, function(erro, result) {
            if (erro) {
                reject(erro)
            } else {
                resolve(result)
            }
        })
    })
}