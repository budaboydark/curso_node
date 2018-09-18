var express = require('express')
var middleware = require('../config/middleware')
var app = express()

app.use(middleware)
app.set('view engine', 'ejs')
app.set('views', './app/views')

module.exports = app