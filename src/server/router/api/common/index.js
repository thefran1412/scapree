const express = require('express')
const router = express.Router()

const addCompanie = require('./handlers/upload')

router.post('/upload', addCompanie)

module.exports = router
