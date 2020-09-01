module.exports = function() {
    this.getTotalMes = (mes,ano,connection,callback) => {        
        connection.query("SELECT SUM(valorparcela) as total, ((SELECT valor FROM salario WHERE MONTH(data) = "+mes+" AND YEAR(data) = "+ano+")-SUM(valorparcela)) AS saldo,MONTH(vencimento) as mes FROM contas_pagar WHERE MONTH(vencimento) = "+mes+" and YEAR(vencimento) = "+ano+" GROUP BY MONTH(vencimento);",callback)
    }
    return this;
}