const User = require('../../../../models/User')

function checkEmail (req, res) {
  const {email} = req.body

  req.check('email', 'Invalid email address').isEmail().trim().normalizeEmail()
  const errors = req.validationErrors()

  if (errors) {
    res.json({success: false, msg: errors})
  } else {
    User.find({email: email.trim()})
      .then(tasks => {
        if (tasks.length > 0) {
          res.json({success: false, msg: 'email already exists'})
        } else {
          res.json({success: true, msg: 'email is not used'})
        }
      })
      .catch(err => console.log(err))
  }
}

module.exports = checkEmail
