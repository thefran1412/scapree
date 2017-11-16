const User = require('../../../../models/User')

function registerUser (req, res) {
  const {username, password, email, name, userType} = req.body
  console.log(username)
  const account = new User({username, password, email, name, userType})

  User.register(account, (err, user) => {
    if (err) {
      return res.status(500).json({success: false, msg: 'There was some error.'})
    }
    res.status(200).json({
      success: true,
      msg: 'Successful created new user.',
      user
    })
  })
}

module.exports = registerUser
