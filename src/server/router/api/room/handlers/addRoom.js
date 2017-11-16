const mongoose = require('mongoose')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const params = req.body

  const newRoom = new Room({
    name: params.name || 'undefined',
    profileImg: params.profileImg || 'default.png',
    desc: params.desc || 'No description',
    duration: +params.duration || 60,
    minAge: +params.minAge || 5,
    minPeople: +params.minPeople || 2,
    maxPeople: +params.maxPeople || 6,
    difficulty: +params.difficulty || 0,
    price: +params.price || 10,
    visible: params.visible || true,
    languages: ['ca', 'es'],
    created: +new Date() + 7 * 24 * 60 * 60 * 1000,
    companie: mongoose.Types.ObjectId(params.companie)
  })

  newRoom.save()
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
