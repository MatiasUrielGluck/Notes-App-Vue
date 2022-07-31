const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/', controller.getCategories)
router.post('/', controller.createCategory)
router.get('/:id', controller.getCategory)
router.patch('/:id', controller.updateCategory)
router.delete('/:id', controller.deleteCategory)

module.exports = router