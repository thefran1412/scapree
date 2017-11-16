const mongoose = require('mongoose')
const Schema = mongoose.Schema

var RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: true
  },
  companie: {
    type: Schema.ObjectId,
    ref: 'Companie'
  },
  desc: String,
  duration: {
    type: Number,
    required: true
  },
  minAge: Number,
  minPeople: Number,
  maxPeople: Number,
  difficulty: Number,
  price: Number,
  languages: Array,
  visible: Boolean,
  review: [{
    type: Schema.ObjectId,
    ref: 'Review'
  }],
  created: Date
})

module.exports = mongoose.model('Room', RoomSchema)
