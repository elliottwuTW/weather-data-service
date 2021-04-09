const express = require('express')
const dotenv = require('dotenv')

// read environment variables
dotenv.config()

require('./config/mongoose')
const saveWeatherData = require('./utils/saveWeatherData')

// record the open weather data periodically
setInterval(saveWeatherData, 3000)

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
