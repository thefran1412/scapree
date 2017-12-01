const Room = require('../../../../models/Room.js')
const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const params = req.body

  Companie.findOne({user: req.session.user._id})
    .then(companies => {
      if (companies._id) {
        const newRoom = new Room({
          name: params.name || 'undefined',
          profileImg: params.profileImg || 'default.png',
          companie: companies._id,
          desc: params.desc || 'No description',
          duration: +params.duration,
          minAge: +params.minAge,
          minPeople: +params.minPeople,
          maxPeople: +params.maxPeople,
          difficulty: +params.difficulty,
          price: +params.price,
          visible: params.visible || true,
          reservation: params.reservation || '/',
          location: {
            type: 'Point',
            coordinates: [params.location.coordinates[1], params.location.coordinates[0]],
            address: params.location.address
          },
          created: +new Date() + 7 * 24 * 60 * 60 * 1000
        })
        newRoom.save()
          .then(tasks => res.json(tasks))
          .catch(err => console.log(err))
      } else {
        res.json({success: false, msg: 'User does not have company'})
      }
    })
    .catch(err => console.log(err))
}
