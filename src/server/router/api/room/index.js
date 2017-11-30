const express = require('express')
let bodyParser = require('body-parser')

const router = express.Router()

const checkAuth = require('../../../middlewares/checkAuth')

const getRooms = require('./handlers/getRooms')
const getMyRooms = require('./handlers/getMyRooms')
const getRoom = require('./handlers/getRoom')
const addRoom = require('./handlers/addRoom')
const editRoom = require('./handlers/editRoom')
const deleteRoom = require('./handlers/deleteRoom')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/rooms', getRooms)
router.get('/myrooms', checkAuth, getMyRooms)
router.post('/room', checkAuth, addRoom)
router.route('/room/:id')
  .get(getRoom)
  .put(checkAuth, editRoom)
  .delete(checkAuth, deleteRoom)

module.exports = router
