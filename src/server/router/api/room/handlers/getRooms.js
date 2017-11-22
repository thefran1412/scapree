const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  // const {} = req.query
  console.log(req.query, req.body)
  Room.find({visible: true})
    .populate('companie')
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
