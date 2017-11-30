const express = require('express')
const router = express.Router()

const checkAuth = require('../../../middlewares/checkAuth')
const addCompanie = require('./handlers/upload')

router.post('/upload', checkAuth, addCompanie)

module.exports = router
