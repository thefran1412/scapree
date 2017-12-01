const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const userId = req.session.user._id

  Room.findOne({_id: req.params.id})
    .populate('companie', 'user')
    .then(data => {
      if (data.companie.user.toString() === userId) {
        Room.findOneAndRemove({_id: req.params.id})
          .then(task => res.json({success: true, data: task}))
          .catch(err => console.log(err))
      } else {
        res.json({success: false, msg: 'Not owner'})
      }
    })
    .catch(err => console.log(err))
}
