const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const params = req.body
  const newCompanie = new Companie({
    name: params.name || 'undefined',
    user: req.session.user._id,
    email: params.email,
    phone: params.phone,
    desc: params.desc,
    profileImg: params.profileImg || 'default.png',
    coverImg: params.coverImg || 'default.png',
    visible: params.visible || true,
    created: +new Date() + 7 * 24 * 60 * 60 * 1000
  })

  newCompanie.save()
    .then(companie => res.json(companie))
    .catch(err => res.json({success: false, msg: err}))
}
