module.exports = function(app) {
    app.get('/planilhas/:id?', (req, res) => {

        var contasModel = app.app.models.contasModel
        var connection = app.config.dbConnection();
        contasModel.getContasMes("2019",connection, function(erro, result) {
            var mensal = []

            result.forEach(element => {
                if(mensal[element.vencimento]){
                    var m = mensal[element.vencimento]
                    mensal[element.vencimento] = (m+element.parcela)    
                }else{                
                    mensal[element.vencimento] = element.parcela
                }
            });

            var numeral = require('numeral')

            var data = {
                dados: [
                    { mes: "janeiro",valor: mensal[1] },
                    { mes: "fevereiro",valor: mensal[2] },
                    { mes: "março",valor: mensal[3] },
                    { mes: "abril",valor: mensal[4] },
                    { mes: "maio",valor: mensal[5] },
                    { mes: "junho",valor: mensal[6] },
                    { mes: "julho",valor: mensal[7] },
                    { mes: "agosto",valor: mensal[8] },
                    { mes: "setembro" ,valor: mensal[9]},
                    { mes: "outubro" ,valor: mensal[10]},
                    { mes: "novembro" ,valor: mensal[11]},
                    { mes: "dezembro",valor: (mensal[12])?mensal[12]: 0 }
                ]
            }
            res.render('planilhas/planilha', { dados: data.dados, numeral:numeral })            
        })

        
    })

}