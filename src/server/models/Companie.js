const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CompanieSchema = new Schema({
  name: String,
  contact: {
    email: String,
    phone: Number
  },
  desc: String,
  profileImg: String,
  coverImg: String,
  tags: Array,
  location: {
    lat: Number,
    long: Number,
    address: String,
    code: String,
    city: String,
    country: String
  },
  visible: Boolean,
  created: Date
})

module.exports = mongoose.model('Companie', CompanieSchema)
