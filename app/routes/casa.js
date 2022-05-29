module.exports = function (app) {
    app.get("/casa/adicionar", async function (req, res) {
        res.render("admin/form_casa", {
            message: "",
          });  
    });

    app.post("/casa", async function (req, res) {
            app.app.controllers.casa.save(app,req,res);
    });

    app.get("/casa/planilha/:id?", async function (req,res){
        app.app.controllers.casa.getDespesas(app,req,res);
    })

    app.get("/casa", async function (req,res){
        app.app.controllers.casa.get(app,req,res);
    })
}