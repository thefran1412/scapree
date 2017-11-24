const Companie = require('../../../../models/Companie.js')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  if (req.session.user) {
    let filters = {
      user: req.session.user._id
    }

    Companie.findOne(filters)
      .then(companies => {
        Room.find({companie: companies._id})
          .then(tasks => res.send(tasks))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  } else {
    res.send({success: false})
  }
}
