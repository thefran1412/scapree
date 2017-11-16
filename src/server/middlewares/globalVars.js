module.exports = (req, res, next) => {
  res.locals.user = req.user || null
  console.log('been there')
  next()
}
