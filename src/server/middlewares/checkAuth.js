module.exports = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send({success: false, msg: '401 Unauthorized'})
  } else {
    next()
  }
}
