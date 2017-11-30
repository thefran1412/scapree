const Companie = require('../../../../models/Companie.js')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  if (req.session.user) {
    const id = req.session.user._id
    Companie.findOne({user: id})
      .then(companie => {
        if (companie) {
          Room.find({companie: companie._id})
            .then(rooms => res.send({success: true, logged: true, companie: true, data: {companie, rooms}}))
            .catch(err => console.log(err))
        } else {
          res.send({success: false, logged: true, companie: false, msg: 'This user has no companie linked'})
        }
      })
      .catch(err => console.log(err))
  } else {
    res.send({success: false, logged: false, companie: false, msg: 'User is not logged in'})
  }
}
