const User = require('../../../../models/User.js')

function login (req, res) {
  const {username, password} = req.body

  User.logIn(username, password, (err, data) => {
    if (err) throw err
    if (!data.success) {
      res.json(data)
    } else {
      req.session.user = data.newUser
      req.session.token = data.token
      res.status(200).json({success: data.success, token: data.token, user: data.newUser})
    }
  })
}

module.exports = login
