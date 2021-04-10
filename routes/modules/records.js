const express = require('express')
const router = express.Router()

// request handler
const { getLatestRecords } = require('../../controllers/records')

router.get('/latest', getLatestRecords)

module.exports = router
