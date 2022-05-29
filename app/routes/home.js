module.exports = function (app) {
    app.get('/', async function (req, res) {
        var contasModel = app.app.models.contas
        var connection = app.config.dbConnection();
        var user = (req.session.login) ? req.session.login : null
        await contasModel.getContaTotalResto('2022', connection, async (erro, response) => {
            var final = response
            await contasModel.getContaTotalResto('2022', connection, async (erro, pagar) => {
                var pagar2022 = pagar
                await contasModel.getContaTotalAno(connection, (erro, response) => {
                    res.render("home/index", { totais: response, resto: final, resto2022: pagar2022, usuario: user })
                })
            })

        })
    })
}