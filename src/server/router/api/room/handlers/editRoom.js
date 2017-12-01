const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const id = req.params.id

  const edit = {
    name: req.body.name,
    desc: req.body.desc,
    minAge: req.body.minAge,
    minPeople: req.body.minPeople,
    maxPeople: req.body.maxPeople,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
    price: req.body.price,
    reservation: req.body.reservation,
    location: req.body.location,
    profileImg: req.body.profileImg,
    visible: req.body.visible
  }

  if (req.session.user._id === req.body.companie.user) {
    Room.findOneAndUpdate({_id: id}, edit)
      .then(room => res.json({success: true, data: room}))
      .catch(err => console.log(err))
  } else {
    res.json({success: false, msg: 'User is not the owner'})
  }
}
