const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const id = req.params.id
  const edit = req.body

  Companie.findOneAndUpdate({_id: id}, edit)
    .then(task => res.json(task))
    .catch(err => console.log(err))
}
