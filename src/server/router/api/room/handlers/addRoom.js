const mongoose = require('mongoose')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const params = req.body

  const newRoom = new Room({
    name: params.name || 'undefined',
    profileImg: params.profileImg || 'default.png',
    companie: mongoose.Types.ObjectId(params.companie),
    desc: params.desc || 'No description',
    duration: +params.duration || 60,
    minAge: +params.minAge || 5,
    minPeople: +params.minPeople || 2,
    maxPeople: +params.maxPeople || 6,
    difficulty: +params.difficulty || 0,
    price: +params.price || 10,
    languages: ['ca', 'es'],
    visible: params.visible || true,
    location: {
      type: 'Point',
      coordinates: [2.153634, 41.408225],
      address: 'Ptge Frigola 14',
      code: '08012',
      city: 'Barcelona',
      country: 'Catalonia'
    },
    tags: ['architecture', 'scary'],
    created: +new Date() + 7 * 24 * 60 * 60 * 1000
  })

  newRoom.save()
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
