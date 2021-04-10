const express = require('express')
const router = express.Router()

// request handler
const { getLatestRecords } = require('../../controllers/records')

// middleware
const { protect, countCall } = require('../../middleware/auth')

router.get('/latest', protect, countCall, getLatestRecords)

module.exports = router
