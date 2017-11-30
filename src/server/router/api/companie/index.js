const express = require('express')
const router = express.Router()

const addCompanie = require('./handlers/addCompanie')
const getCompanies = require('./handlers/getCompanies')
const getCompanie = require('./handlers/getCompanie')
const getMyCompanie = require('./handlers/getMyCompanie')
const editCompanie = require('./handlers/editCompanie')
const deleteCompanie = require('./handlers/deleteCompanie')

router.get('/companies', getCompanies)
router.get('/mycompanie', getMyCompanie)
router.post('/companie', addCompanie)
router.route('/companie/:id')
  .get(getCompanie)
  .put(editCompanie)
  .delete(deleteCompanie)

module.exports = router
