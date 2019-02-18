var express = require('express')
var app = express()
var consign = require('consign')
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(expressLayouts)
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(expressValidator())
app.use(express.static('public'))

//var routes = require('./app/routes')

//app.use(routes)

consign()
    .include('./app/routes')	
    .then('./config/dbConnection.js')
    .then('./app/models')
    .into(app)

module.exports = app
