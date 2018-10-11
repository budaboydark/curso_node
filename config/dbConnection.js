var mysql = require('mysql');
var connMysql = function() {
    console.log("Conexao com bd foi estabelecida")
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'banco_teste',
        port: '3310'
    })
}
module.exports = function() {
    return connMysql
}