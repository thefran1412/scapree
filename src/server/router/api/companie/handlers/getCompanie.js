const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const {id} = req.params
  Companie.findById(id)
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
