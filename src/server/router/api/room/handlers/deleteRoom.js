const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  Room.findOneAndRemove({_id: req.params.id})
    .then(task => res.json(task))
    .catch(err => console.log(err))
}
