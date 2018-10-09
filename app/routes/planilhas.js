//var dbConnection = require('../../config/dbConnection')
var select = require('../../modulos/mod_teste')
module.exports = function(app) {
    // var connection = dbConnection()
    app.get('/planilhas/:id?', function(req, res) {
        // console.log(req.params.id)
        // var id = req.params.id

        var contas2 = function() {
            select("SELECT * FROM contas_pagar", function(result) {
                return result
            })

        }
        console.log(contas2())
        contasParcial = [{
            id: 1,
            numeroparcela: 2,
            valorparcela: 2.34,
            nome: "teste"
        }]
        var data = {
            dados: {
                [1]: { mes: "janeiro" },
                [2]: { mes: "fevereiro" },
                [3]: { mes: "março" },
                [4]: { mes: "abril" },
                [5]: { mes: "maio" },
                [6]: { mes: "junho" },
                [7]: { mes: "julho" },
                [8]: { mes: "agosto" },
                [9]: { mes: "setembro" },
                [10]: { mes: "outubro" },
                [11]: { mes: "novembro" },
                [12]: { mes: "dezembro" }
            },
            contas: contasParcial
        }
        res.render('planilhas/planilha', data)
    })
}