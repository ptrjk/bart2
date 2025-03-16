const express = require('express')
const db = require('../db')
const jwt = require('jsonwebtoken')
const controller = require('../controllers/loginController')

const router = express.Router()

router.post('/:email', controller.postEmail)

router.get('/setup', controller.getSetup)




module.exports = router