const session = require('express-session')

module.exports = session({
  secret: 'process.env.SECRET',
  saveUninitialized: false,
  resave: false
})
