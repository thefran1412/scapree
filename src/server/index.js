const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('./middlewares/expressSession.js')
const expressValidator = require('./middlewares/expressValidator.js')
const globalVars = require('./middlewares/globalVars.js')

const app = express()

/* MIDDLEWARES */

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession)
app.use(expressValidator)
app.use(globalVars)

/* ROUTES */

const api = require('./router/api')
const front = require('./router/front').default

app.use('/static', express.static('public'))
app.use('/api', api)
app.use('/', front)

module.exports = app

// const currentRoute = routes.find(route => matchPath(req.url, route))
// app.use(cors())
// import cors from 'cors'
