const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('./middlewares/expressSession.js')
const expressValidator = require('./middlewares/expressValidator.js')
const globalVars = require('./middlewares/globalVars.js')
const cors = require('cors')

const app = express()

/* MIDDLEWARES */

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
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
