const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  Companie.findOneAndRemove({_id: req.params.id})
    .then(task => res.json(task))
    .catch(err => console.log(err))
}
