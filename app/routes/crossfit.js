module.exports = (server) => {
    server.get('/view-wod', (req, res, next) => {
        /* server.app.controllers.contas.contas(server, req, res) */
        res.render('crossfit/wods')
    })
}
