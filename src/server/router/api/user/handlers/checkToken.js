const jwt = require('jsonwebtoken')

function check (req, res) {
  const {token} = req.body
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      res.json({success: false})
    } else {
      res.json({success: true, data: decoded})
    }
  })
}

module.exports = check
