const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const {id} = req.params
  Room.findById(id)
    .populate('companie')
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({success: false, msg: err}))
}
