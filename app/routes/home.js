module.exports = function(app) {
    app.get('/', async function(req, res) {
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        await contasModel.getContaTotalResto('2020',connection,async (erro,response) => {
            var final = response
            await contasModel.getContaTotalResto('2020', connection, async (erro,pagar) => {
                var pagar2020 = pagar
                await contasModel.getContaTotalAno(connection,(erro,response) => {
                    res.render("home/index",{totais: response, resto: final, resto2020: pagar2020 })    
                 })
            })

        })
    })
}