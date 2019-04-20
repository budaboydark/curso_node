module.exports = (server) => {
    server.get('/teste', (req, res, next) => {
        server.app.controllers.contas.contas(server, req, res)
    })
}
