const Companie = require('../../../../models/Companie.js')

module.exports = function (req, res) {
  const id = req.params.id
  const edit = req.body

  if (req.session.user._id === edit.user) {
    Companie.findOneAndUpdate({_id: id, user: edit.user}, edit)
      .then(task => res.json({success: true, task}))
      .catch(err => console.log(err))
  } else {
    res.json({success: false, msg: 'User is not the owner'})
  }
}
