module.exports = (req, res, next) => {
  if (!req.session.user) {
    res.json({success: false, msg: 'user not logged in'})
  } else {
    next()
  }
}
