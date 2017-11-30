const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CompanieSchema = new Schema({
  name: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: String,
  phone: Number,
  desc: String,
  profileImg: String,
  coverImg: String,
  visible: Boolean,
  created: Date
})

CompanieSchema.index({location: '2dsphere'})

module.exports = mongoose.model('Companie', CompanieSchema)
