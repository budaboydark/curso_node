module.exports = function(app) {
    app.get('/formulario_conta', function(req, res) {
        res.render("admin/form_add_noticia")
    })
}