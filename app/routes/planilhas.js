module.exports = function(app) {
    app.get('/planilhas/:id?', (req, res) => {

        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        var data = req.params.id;
        (data)?data = req.params.id:data = new Date().getFullYear()  
        contasModel.getContasMes(data,connection, function(erro, result) {
            var mensal = []
            var contas = []
		var meses = []
		meses[1] = 'janeiro';
		meses[2] = 'fevereiro';
		meses[3] = 'março';
		meses[4] = 'abril';
		meses[5] = 'maio';
		meses[6] = 'junho';
		meses[7] = 'julho';
		meses[8] = 'agosto';
		meses[9] = 'setembro';
		meses[10] = 'outubro';
		meses[11] = 'novembro';
		meses[12] = 'dezembro';
		
		var mes = [];
            result.forEach(element => {
                var v = {
                    nome : element.nome,
                    parcela : element.parcela
                }

                if(mensal[element.vencimento]){
                    var m = mensal[element.vencimento]
                    mensal[element.vencimento] = (m+element.parcela)
                    contas[element.vencimento].push(element)
			mes[element.vencimento] = element.vencimento
                }else{                
                    mensal[element.vencimento] = element.parcela
                    contas[element.vencimento] = [element]
			mes[element.vencimento] = element.vencimento
                }
            });
		var dataEl = [];
        mes.forEach(elements => {
            var idel = elements;
            dataEl.push(
                { 
                    mes: meses[elements],
                    valor:mensal[elements],
                    desc: contas[elements],
                    id : idel
                })
		});
            var numeral = require('numeral')
            var data = {
                dados: dataEl
            }
            res.render('planilhas/planilha', { dados: data.dados, numeral:numeral })            
        })

        
    })

}
