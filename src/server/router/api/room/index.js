const express = require('express')
let bodyParser = require('body-parser')

const router = express.Router()
const getRooms = require('./handlers/getRooms')
const getRoom = require('./handlers/getRoom')
const addRoom = require('./handlers/addRoom')
const editRoom = require('./handlers/editRoom')
const deleteRoom = require('./handlers/deleteRoom')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/rooms', getRooms)
router.post('/room', addRoom)
router.route('/room/:id')
  .get(getRoom)
  .put(editRoom)
  .delete(deleteRoom)

module.exports = router
