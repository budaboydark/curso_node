module.exports = function (app) {
    app.post('/sig-in', async function (req, res) {
        const argon2 = require('argon2');
        var model = app.app.models.user;
        var dbConnection = app.config.dbConnection();

        model.get(req.body, dbConnection, async (err, result) => {
            if (err) {
                console.log(err)
                res.render("admin/form_login", { msg: 'Falha no login, tente novamente' })
                return
            }

            if (result.length > 0) {
                if (await argon2.verify(result[0].pass, req.body.password)) {
                    var user = {
                        nome: result[0].name,
                        auth: true,
                        id: result[0].id,
                        email: result[0].email,
                        lastName: result[0].name_last
                    }
                    req.session.login = user;
                    res.redirect("/")
                } else {
                    res.render("admin/form_login", { msg: 'Falha no login, tente novamente 1' })
                }
            } else {
                res.render('admin/form_login', { msg: 'Falha no login, tente novamente' })
            }

        });

    })

    app.get('/sig-out', function (req, res) {
        req.session = null
        res.redirect("/")
    })

    app.get('/profile-update', (req, res) => {
        res.render('admin/form_register_update', { user: req.session.login })
    })

    app.get('/profile-create',(req, res) => {
        res.render('admin/form_register_create');
    })

    app.post('/sig-prfil', async (req, res) => {
        const argon2 = require('argon2');
        var model = app.app.models.user;
        var dbConnection = app.config.dbConnection();
        var post = req.body;

        var data = [
            post.name,
            post.lastname,
        ];

        var id = req.session.login.id;
        if (post.password) {
            data.push(await argon2.hash(post.password));
        }

        data.push(id);

        model.update(data, post, dbConnection, (err, result) => {
            if(result){
                req.session.login.nome = post.name;
                req.session.login.lastName = post.lastname;
                req.session.login.nome = post.name;
                res.redirect('/')
            }
        })
    })

    app.post('/create-prfil', async (req, res) => {
        const argon2 = require('argon2');
        var model = app.app.models.user;
        var dbConnection = app.config.dbConnection();
        var post = req.body;
        var data = [
            post.name,
            post.lastname,
            post.email
        ];
        data.push(await argon2.hash(post.password));
        console.log(data);
        model.insert(data, dbConnection, (err, result) => {
            if(result){
                res.redirect('/')
            }
        })

    })

}