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
  reservation: {
    type: String,
    required: true
  },
  location: {
    type: {type: String},
    coordinates: [Number, Number],
    address: String,
    code: String,
    city: String,
    country: String
  },
  tags: Array,
  created: Date
})

RoomSchema.index({location: '2dsphere'})

module.exports = mongoose.model('Room', RoomSchema)
