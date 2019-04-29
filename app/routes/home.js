module.exports = function(app) {
    app.get('/', async function(req, res) {
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        await contasModel.getContaTotalAno(connection,(erro,response) => {
            res.render("home/index",{totais: response})    
         })
    })
}