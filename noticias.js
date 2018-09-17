var http = require('http');

var server = http.createServer(function(req, res) {
    var categoria = req.url
    if (categoria == '/tecnologia') {
        res.end("<html><body>Acessando página de Técnologia por req.URL</body></html>")
    } else {

        res.end("<html><body>Portal noticias</body></html>")
            //res.end(categoria)
    }
});

server.listen(3000);