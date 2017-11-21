const jwt = require('jsonwebtoken')

function check (req, res) {
  const {token} = req.body
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      res.json({success: false})
    } else {
      if (decoded.user._id === req.session.user._id) {
        res.json({success: true, data: decoded})
      } else {
        res.json({success: false})
      }
    }
  })
}

module.exports = check
