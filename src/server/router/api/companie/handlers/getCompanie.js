const Companie = require('../../../../models/Companie.js')
const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const {id} = req.params
  Companie.findById(id)
    .then(companie => {
      Room.find({companie: id})
        .then(rooms => res.json({success: true, data: {companie, rooms}}))
        .catch(err => res.json({success: false, msg: err}))
    })
    .catch(err => res.json({success: false, msg: err}))
}
