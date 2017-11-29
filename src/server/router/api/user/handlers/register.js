const User = require('../../../../models/User')

function registerUser (req, res) {
  const {username, password, email, name, userType} = req.body
  const account = new User({username, password, email, name, userType})

  // validate data
  req.check('name', 'Invalid name').trim().isLength({min: 1})
  req.check('username', 'Invalid username').trim().isLength({min: 1})
  req.check('email', 'Invalid email address').isEmail()
  req.check('password', 'Password is invalid').isLength({min: 3}).equals(req.body.alsoPassword)

  const errors = req.validationErrors()

  if (errors) {
    res.json({success: false, msg: errors})
  } else {
    User.register(account, (err, user) => {
      if (err) {
        return res.json({success: false, msg: 'There was some error.'})
      } else {
        delete user.password
        
        res.json({
          success: true,
          msg: 'Successful created new user.',
          user
        })
      }
    })
  }
}

module.exports = registerUser
