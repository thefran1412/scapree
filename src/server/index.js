const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('./middlewares/expressSession.js')
const expressValidator = require('./middlewares/expressValidator.js')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

/* MIDDLEWARES */

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator)
app.use(expressSession)

/* ROUTES */

const api = require('./router/api')
const front = require('./router/front').default

app.use('/favicon.ico', express.static('public/favicon.ico'))
app.use('/static', express.static('public'))
app.use('/static', (req, res) => {
  res.send({success: false, msg: 'did not find the file'})
})

app.use('/api', api)
app.use('/', front)

module.exports = app
