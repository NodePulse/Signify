const express = require('express')
const authController = require('../controller/auth.controller')

const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/google', authController.google)

module.exports = router