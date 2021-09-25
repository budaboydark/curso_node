module.exports = function(req, res, next) {
    var path = req.path.split('/');
    if(req.session.login || path[1] == 'sig-in' || path[1] == 'profile-create' || path[1] == 'create-prfil'){
        next()
    }else{
        res.render('admin/form_login')
    }
}