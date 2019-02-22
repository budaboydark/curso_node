module.exports = function(app) {
    app.get('/planilhas/:id?', (req, res) => {

        var contasModel = app.app.models.contasModel
        var connection = app.config.dbConnection();
        var data = req.params.id;
        (data)?data = req.params.id:data = new Date().getFullYear()  
        contasModel.getContasMes(data,connection, function(erro, result) {
            var mensal = []
            var contas = []
            result.forEach(element => {
                var v = {
                    nome : element.nome,
                    parcela : element.parcela
                }

                if(mensal[element.vencimento]){
                    var m = mensal[element.vencimento]
                    mensal[element.vencimento] = (m+element.parcela)
                    contas[element.vencimento].push(element)
                }else{                
                    mensal[element.vencimento] = element.parcela
                    contas[element.vencimento] = [element]
                }
            });
            var numeral = require('numeral')
            var data = {
                dados: [
                    { mes: "janeiro",valor: mensal[1],desc: contas[1] },
                    { mes: "fevereiro",valor: mensal[2],desc: contas[2] },
                    { mes: "março",valor: mensal[3],desc: contas[3] },
                    { mes: "abril",valor: mensal[4],desc: contas[4] },
                    { mes: "maio",valor: mensal[5],desc: contas[5] },
                    { mes: "junho",valor: mensal[6],desc: contas[6] },
                    { mes: "julho",valor: mensal[7],desc: contas[7] },
                    { mes: "agosto",valor: mensal[8],desc: contas[8] },
                    { mes: "setembro" ,valor: mensal[9],desc: contas[9]},
                    { mes: "outubro" ,valor: mensal[10],desc: contas[10]},
                    { mes: "novembro" ,valor: mensal[11],desc: (contas[11])?contas[11]:[]},
                    { mes: "dezembro",valor: (mensal[12])?mensal[12]: 0,desc: (contas[12])?contas[12]:[] }
                ]
            }
            res.render('planilhas/planilha', { dados: data.dados, numeral:numeral })            
        })

        
    })

}
