const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const props = req.query
  console.log(props)

  let filters = {
    visible: true
  }
  console.log(req.session.user)
  if (props.type === 'mine') {
    filters.companie = req.session.user.companie
  }
  if (props.lat && props.long) {
    filters.location = {
      $near: {
        $geometry: {type: 'Point', 'coordinates': [+props.long, +props.lat]},
        $maxDistance: 10000
      }
    }
  }
  if (props.people) {
    filters.minPeople = {$lte: +props.people}
    filters.maxPeople = {$gte: +props.people}
  }
  Room.find(filters)
    // .populate('companie')
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
