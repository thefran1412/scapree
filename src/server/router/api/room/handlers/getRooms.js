const Room = require('../../../../models/Room.js')

module.exports = function (req, res) {
  const props = req.query

  let filters = {
    visible: true
  }
  let page = props.page && !isNaN(props.page) ? +props.page : 1
  let order = props.order || 'price'
  let direction = props.direction || 'asc'
  let orderBy = { [order]: direction }

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
    .skip(50 * (page - 1))
    .limit(50)
    .sort(orderBy)
    // .populate('companie')
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
}
