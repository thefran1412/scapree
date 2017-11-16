const passport = require('passport')
const User = require('../../../../models/User.js')

function logout (req, res) {
  res.logout()
}

module.exports = logout
