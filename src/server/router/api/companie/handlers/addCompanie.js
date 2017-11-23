const mongoose = require('mongoose')
const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const params = req.body
  const newCompanie = new Companie({
    name: params.name || 'undefined',
    user: mongoose.Types.ObjectId(params.user),
    contact: {
      email: params.mail,
      phone: +params.phone
    },
    desc: params.desc,
    profileImg: params.profileImg || 'default.png',
    coverImg: params.coverImg || 'default.png',
    location: {
      type: 'Point',
      coordinates: [2.153634, 41.408225],
      address: 'Ptge Frigola 14',
      code: '08012',
      city: 'Barcelona',
      country: 'Catalonia'
    },
    visible: params.visible || true,
    created: +new Date() + 7 * 24 * 60 * 60 * 1000
  })

  newCompanie.save()
    .then(companie => res.json(companie))
    .catch(err => console.log(err))
}
