const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CompanieSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number,
    required: true
  },
  comment: String,
  created: Date
})

module.exports = mongoose.model('Companie', CompanieSchema)
  // room: {
  //   type: Schema.ObjectId,
  //   ref: 'Room'
  // },
