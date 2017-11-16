const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const id = req.params.id
  const edit = req.body

  Room.findOneAndUpdate({_id: id}, edit)
    .then(task => res.json(task))
    .catch(err => console.log(err))
}
