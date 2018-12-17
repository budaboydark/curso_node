module.exports = function(app) {
    app.get('/conta/adicionar', function(req, res) {
        res.render("admin/form_add_conta")
    })
}