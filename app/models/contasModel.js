module.exports = function() {

    this.getContas = (connection, callback) => {
        connection.query("SELECT * FROM contas_pagar", callback)
    }

    this.getConta = (idConta, connection, callback) => {
        connection.query("SELECT * FROM contas_pagar WHERE id = " + idConta, callback)
    }

    return this
}