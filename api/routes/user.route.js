const express = require('express')
const testController = require('../controller/user.controller')

const router = express.Router()

router.get('/', testController)

module.exports = router