const express = require('express')
const router = express.Router()
const notes = require('../apiServices/notes/routes')

router.use('notes', notes)

module.exports = router