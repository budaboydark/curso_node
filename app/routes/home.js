module.exports = function(app) {
    app.get('/', function(req, res) {
        // res.render("header")
        res.render("home/index")
            // res.render("footer")
    })
}