const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const props = req.query
  console.log(props)

  let filters = {
    visible: true
  }
  // if (props.type === 'mine') {
  //   filters.companie = req.session.user.companie
  // }
  if (props.lat && props.long) {
    filters.location = {
      $near: {
        $geometry: {
          type: 'Point',
          'coordinates': [+props.long, +props.lat]
        },
        $maxDistance: 100000
      }
    }

    // {coordinates:{lat: props.lat, long: props.long}}
  }
  if (props.people) {
    filters.minPeople = {$lte: +props.people}
    filters.maxPeople = {$gte: +props.people}
  }
  console.log()
  Room.find(filters)
    // .populate('companie')
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
