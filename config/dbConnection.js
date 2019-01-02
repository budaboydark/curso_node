var mysql = require('mysql');
var connMysql = function() {
    console.log("Conexao com bd foi estabelecida")
    return mysql.createConnection({
        host: 'localhost',
        user: 'cliente',
        password: 'teste',
        database: 'banco_teste',
        port: '3306'
    })
}
module.exports = function() {
    return connMysql
}