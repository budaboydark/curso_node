var mysql = require('mysql');
module.exports = function() {
    return mysql.createConnection({
        host: 'mysql.des.f1s.me',
        user: 'des',
        password: 'des',
        database: 'f1s_multisom_20180723'
    })
}