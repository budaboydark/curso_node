module.exports = function() {

    this.getContas = (sql, connection, callback) => {
        connection.query(sql, callback)
    }
    return this
}