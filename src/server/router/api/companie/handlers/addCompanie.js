const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const params = req.body
  const newCompanie = new Companie({
    name: params.name || 'undefined',
    contact: {
      email: params.mail,
      phone: +params.phone
    },
    desc: params.desc,
    profileImg: params.profileImg || 'default.png',
    coverImg: params.coverImg || 'default.png',
    tags: ['architecture', 'scary'],
    visible: params.visible || true,
    location: {
      lat: 41.408225,
      long: 2.153634,
      address: 'Ptge Frigola 14',
      code: '08012',
      city: 'Barcelona',
      country: 'Catalonia'
    },
    created: +new Date() + 7 * 24 * 60 * 60 * 1000
  })

  newCompanie.save()
    .then(companie => res.json(companie))
    .catch(err => console.log(err))
}
