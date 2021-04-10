const express = require('express')
const router = express.Router()

// modules
const auth = require('./modules/auth')
const records = require('./modules/records')

// routes
router.use('/auth', auth)
router.use('/records', records)

module.exports = router
