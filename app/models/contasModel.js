module.exports = function() {

    this.getContas = (connection, callback) => {
        connection.query("SELECT * FROM contas", callback)
    }

    this.getContaPagar = (idConta, connection, callback) => {
        connection.query("SELECT * FROM contas_pagar WHERE idcontas = " + idConta, callback)
    }

    this.getContaReceber = (idConta, connection, callback) => {
        connection.query("SELECT * FROM contas_receber WHERE id = " + idConta, callback)
    }

    return this
}