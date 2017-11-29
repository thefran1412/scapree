const express = require('express')
const app = express()

const room = require('./room')
const companie = require('./companie')
const user = require('./user')
const common = require('./common')

app.use(room)
app.use(companie)
app.use(user)
app.use(common)

module.exports = app
