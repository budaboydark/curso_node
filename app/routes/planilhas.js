var dbConnection = require('../../config/dbConnection')
module.exports = function(app) {
    var connection = dbConnection()
    app.get('/planilhas/:id?', function(req, res) {
        // console.log(req.params.id)
        // var id = req.params.id


        var f = connection.query("SELECT * FROM contas_pagar", function(erro, result) {
            console.log(result)
        })

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
            }

        }
        res.render('planilhas/planilha', data)
    })
}