module.exports = function(app) {
    app.get('/conta/adicionar', function(req, res) {
        res.render("admin/form_add_conta",{message : null})
    })

    app.get('/conta/atualizar/pagar/:id', function(req,res){
        var params = req.params;
        res.render('admin/form_update_conta_pagar',{message : null, id: params.id})
    })

    app.get('/conta/atualizar/vencimento/:id', function(req,res){
        var params = req.params;
        res.render('admin/form_update_vencimento_conta_pagar',{message : null, id: params.id})
    })
}