const express = require('express')
const studentController = require('../controllers/studentController')

const router = express.Router()

router.get('/:studentId', studentController.index)
router.get('/:studentId/[a-zA-Z0-9]*', studentController.index)

router.put('/:studentId', studentController.put)
router.put('/:studentId/[a-zA-Z0-9]*', studentController.put)

router.delete('/:studentId', studentController.delete)
router.delete('/:studentId/[a-zA-Z0-9]*', studentController.delete)

module.exports = router
