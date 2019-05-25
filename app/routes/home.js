module.exports = function(app) {
    app.get('/', async function(req, res) {
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        await contasModel.getContaTotalResto(connection,async (erro,response) => {
            var final = response
            await contasModel.getContaTotalAno(connection,(erro,response) => {
                res.render("home/index",{totais: response, resto: final})    
             })
        })
    })
}