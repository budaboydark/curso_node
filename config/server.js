var express = require('express')
var app = express()
var consign = require('consign')
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var cookieSession = require('cookie-session')
const middleware = require('./middleware')

app.set('trust proxy', 1)
app.set('view engine', 'ejs')
app.set('views', './app/views')
app.set('layouts','./app/views/index')

app.use(cookieSession({
    name: 'session',
    keys: ['rcp1sha2828', 'rcp1sha2727']
  }))

app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(express.static('skins/template1'))

app.use(middleware)

// criar autenticação aqui
consign()
    .include('./app/routes')
    .then('./config/dbConnection.js')
    .then('./app/controllers')
    .then('./app/models')
    .into(app)

module.exports = app
