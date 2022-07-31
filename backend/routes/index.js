const express = require('express')
const router = express.Router()
const notes = require('../apiServices/notes/routes')
const categories = require('../apiServices/categories/routes')

router.use('notes', notes)
router.use('categories', categories)

module.exports = router