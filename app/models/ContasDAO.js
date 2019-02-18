function ContasDAO(connection){    
    this._conection = connection;
    this._nome = "rodrigo";
}

ContasDAO.prototype.insertConta = (dados,callback) => {        
    dados.usuario = 14
    this._conection.query("INSERT INTO contas SET ?",dados,callback)
}

ContasDAO.prototype.updateContaPagar = (dados,callback) => {
    this._conection.query("UPDATE contas_pagar SET valorpago = "+dados.valorpago+", vencimento='"+dados.vencimento+"', status='"+dados.status+"' WHERE id = "+dados.id,null,callback)
}

ContasDAO.prototype.insertContasPagar = (dados,callback) => {
    this._conection.query("INSERT INTO contas_pagar SET ?",dados,callback)
}

ContasDAO.prototype.getContas = ( callback) => {
    this._conection.query("SELECT * FROM contas", callback)
}

ContasDAO.prototype.getContaPagar = (idConta,  callback) => {
    this._conection.query("SELECT * FROM contas_pagar WHERE idcontas = " + idConta, callback)
}

ContasDAO.prototype.getContasMes = (ano,callback) => {
    console.log(this._conection)
    this._conection.query("SELECT valorparcela as parcela,MONTH(vencimento) as vencimento FROM contas_pagar WHERE YEAR(vencimento) = '"+ano+"' ORDER BY MONTH(vencimento) ASC;",callback)
}


ContasDAO.prototype.getContasPagar = (id, callback) => {
    this._conection.query("SELECT * FROM contas_pagar WHERE id = " + id, callback)
} 

ContasDAO.prototype.getContaReceber = (idConta, callback) => {
    this._conection.query("SELECT * FROM contas_receber WHERE id = " + idConta, callback)
}


module.exports = function() {


    return ContasDAO
}