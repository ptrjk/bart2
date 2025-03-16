const express = require('express')
const db = require('../db')
const controller = require('../controllers/notesController')

const router = express.Router()


router.get('/', controller.getNotes)
router.post('/create', controller.postNotes)
router.delete('/delete/:id', controller.deleteNote)
router.put('/edit/:id', controller.editNote)



module.exports = router