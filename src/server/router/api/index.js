const express = require('express')
const app = express()

const room = require('./room')
const companie = require('./companie')
const user = require('./user')

app.use(room)
app.use(companie)
app.use(user)

module.exports = app
