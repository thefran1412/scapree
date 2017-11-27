const Companie = require('../../../../models/Companie.js')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  if (req.session.user) {
    let filters = {
      user: req.session.user._id
    }
    Companie.findOne(filters)
      .then(companies => {
        if (companies) {
          Room.find({companie: companies._id})
            .then(tasks => res.send({success: true, logged: true, companie: true, data: tasks}))
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
