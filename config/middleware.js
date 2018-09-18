 var middleware = function(req, res, next) {
     console.log(res.statusCode)
     next()
 }
 module.exports = middleware