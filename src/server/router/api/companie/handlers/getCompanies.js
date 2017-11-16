const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  Companie.find({visible: true})
    .populate('location')
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
