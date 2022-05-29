module.exports = function () {

    this.get = (connection, callback) => {
        connection.query("SELECT idcasa,descricao,despesa,date_format(vencimento,'%d/%m/%Y') as vencimento,date_format(pago,'%d/%m/%Y') as pago FROM casa ORDER BY idcasa ", callback)
    }

    this.insert = (post, connection, callback) => {
        connection.query("INSERT INTO casa SET descricao=?,despesa = ?,vencimento = ?,user_id = ?", post, callback)
    }

    this.put = (post, connection, callback) => {
        connection.query("UPDATE casa SET descricao=?,despesa = ?,vencimento = ?,pago = ?  WHERE idcasa = ?",post, callback)
    }

    this.getDespesasMes = (ano,connection,callback) => {
        connection.query("SELECT despesa,MONTH(vencimento) as vencimento, descricao, DATE_FORMAT(vencimento,'%d/%m/%Y') as data_venc,pago FROM casa WHERE YEAR(vencimento) = '"+ano+"' ORDER BY MONTH(vencimento) ASC;",callback)
    }

    return this
}
