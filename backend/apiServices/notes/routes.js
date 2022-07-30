const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/', controller.getNotes)
router.post('/', controller.createNote)
router.get('/:id', controller.getNote)
router.patch('/:id', controller.updateNote)
router.delete('/:id', controller.deleteNote)

module.exports = router