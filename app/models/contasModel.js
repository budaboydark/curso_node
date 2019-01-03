module.exports = function() {

    this.insertConta = (dados,connection,callback) => {        
        dados.usuario = 14
        connection.query("INSERT INTO contas SET ?",dados,callback)
    }

    this.updateContaPagar = (dados,connection,callback) => {
        connection.query("UPDATE contas_pagar SET valorpago = "+dados.valorpago+", vencimento='"+dados.vencimento+"', status='"+dados.status+"' WHERE id = "+dados.id,null,callback)
    }

    this.insertContasPagar = (dados,connection,callback) => {
        connection.query("INSERT INTO contas_pagar SET ?",dados,callback)
    }

    this.getContas = (connection, callback) => {
        connection.query("SELECT * FROM contas", callback)
    }

    this.getContaPagar = (idConta, connection, callback) => {
        connection.query("SELECT * FROM contas_pagar WHERE idcontas = " + idConta, callback)
    }

    this.getContasPagar = (id, connection, callback) => {
        connection.query("SELECT * FROM contas_pagar WHERE id = " + id, callback)
    } 

    this.getContaReceber = (idConta, connection, callback) => {
        connection.query("SELECT * FROM contas_receber WHERE id = " + idConta, callback)
    }

    return this
}