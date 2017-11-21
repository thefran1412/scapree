const express = require('express')
let bodyParser = require('body-parser')

// const passport = require('../../../config/passport')

const router = express.Router()
const login = require('./handlers/login')
const logout = require('./handlers/logout')
const register = require('./handlers/register')
const checkToken = require('./handlers/checkToken')
const checkUsername = require('./handlers/checkUsername')
const checkEmail = require('./handlers/checkEmail')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.post('/check/token', checkToken)
router.post('/check/username', checkUsername)
router.post('/check/email', checkEmail)

router.get('/users', (req, res) => {
  const User = require('../../../models/User.js')
  User.find()
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err))
})

module.exports = router
