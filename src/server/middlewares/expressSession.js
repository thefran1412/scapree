const session = require('express-session')

module.exports = session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
})
