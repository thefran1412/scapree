const User = require('../../../../models/User')

function checkUsername (req, res) {
  const {username} = req.body

  req.check('username', 'not a valid username provided').matches(/^[a-zA-Z0-9]+$/, 'g')
  const errors = req.validationErrors()

  if (errors) {
    res.json({success: false, msg: errors})
  } else {
    User.find({username: username.trim()})
      .then(tasks => {
        if (tasks.length > 0) {
          res.json({success: false, msg: 'username already exists'})
        } else {
          res.json({success: true, msg: 'username is not used'})
        }
      })
      .catch(err => console.log(err))
  }
}

module.exports = checkUsername
