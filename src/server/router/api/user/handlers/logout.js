function logout (req, res) {
  req.session.destroy(err => {
    if (!err) {
      res.json({success: true})
    } else {
      res.json({success: false})
    }
  })
  console.log('session removed')
}

module.exports = logout
