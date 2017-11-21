const mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const {generateToken} = require('../services/token.js')

// types of user: normal, admin, company

var UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  name: String,
  userType: String,
  token: String,
  friends: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  saved: [{
    type: Schema.ObjectId,
    ref: 'Room'
  }],
  created: Date
})

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.register = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}

const getUserByUsername = (username, callback) => {
  var query = {username: username}
  User.findOne(query, callback)
}

const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err
    callback(null, isMatch)
  })
}

module.exports.logIn = (username, password, callback) => {
  getUserByUsername(username, (err, user) => {
    if (err) throw err
    if (!user) {
      callback(err, {success: false, message: 'incorrect user'})
    } else {
      comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          const newUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            userType: user.userType
          }
          const token = generateToken(newUser)
          callback(err, {success: true, token, newUser})
        } else {
          callback(err, {success: false, message: 'incorrect password'})
        }
      })
    }
  })
}
