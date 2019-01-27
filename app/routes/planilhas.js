module.exports = function(app) {
    app.get('/planilhas/:id?', (req, res) => {
        var data = {
            dados: [
                { mes: "janeiro" },
                { mes: "fevereiro" },
                { mes: "março" },
                { mes: "abril" },
                { mes: "maio" },
                { mes: "junho" },
                { mes: "julho" },
                { mes: "agosto" },
                { mes: "setembro" },
                { mes: "outubro" },
                { mes: "novembro" },
                { mes: "dezembro" }
            ]
        }
        res.render('planilhas/planilha', data)
    })

}