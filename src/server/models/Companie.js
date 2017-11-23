const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CompanieSchema = new Schema({
  name: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  contact: {
    email: String,
    phone: Number
  },
  desc: String,
  profileImg: String,
  coverImg: String,
  location: {
    type: {type: String},
    coordinates: [Number, Number],
    address: String,
    code: String,
    city: String,
    country: String
  },
  visible: Boolean,
  created: Date
})

CompanieSchema.index({location: '2dsphere'})

module.exports = mongoose.model('Companie', CompanieSchema)
