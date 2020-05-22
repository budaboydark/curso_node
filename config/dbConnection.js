require('dotenv').config();
// UTILIZAR PM2
var mysql = require('mysql');
var params = {
	db : {
		host : process.env.DBHOST,
		user : process.env.DBUSER,
		password : process.env.DBPASS,
		database : process.env.DBDATABASE,
		port : process.env.DBPORT,

	}
}
var conn = params.db;
var connMysql = mysql.createConnection(conn)

	connMysql.connect(function(err){
		if(err){
			console.log('falha na conexao com DB'+err.stack)
			return
		}
		console.log('conectado com sucesso')
	})
var connect = function(){
	return connMysql
}
module.exports = function() {
    return connect
}
