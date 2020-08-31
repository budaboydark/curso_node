module.exports = function() {
    this.getTotalMes = (mes,ano,connection,callback) => {        
        connection.query("SELECT SUM(valorparcela) as total, (3700.00-SUM(valorparcela)) AS saldo,MONTH(vencimento) as mes FROM contas_pagar WHERE MONTH(vencimento) = "+mes+" and YEAR(vencimento) = "+ano+" GROUP BY MONTH(vencimento);",callback)
    }
    return this;
}