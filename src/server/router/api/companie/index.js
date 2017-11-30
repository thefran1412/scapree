const express = require('express')
const router = express.Router()

const checkAuth = require('../../../middlewares/checkAuth')

const addCompanie = require('./handlers/addCompanie')
const getCompanies = require('./handlers/getCompanies')
const getCompanie = require('./handlers/getCompanie')
const getMyCompanie = require('./handlers/getMyCompanie')
const editCompanie = require('./handlers/editCompanie')
const deleteCompanie = require('./handlers/deleteCompanie')

router.get('/companies', getCompanies)
router.get('/mycompanie', checkAuth, getMyCompanie)
router.post('/companie', checkAuth, addCompanie)
router.route('/companie/:id')
  .get(getCompanie)
  .put(checkAuth, editCompanie)
  .delete(checkAuth, deleteCompanie)

module.exports = router
