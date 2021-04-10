const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

// read environment variables
dotenv.config()

// connect to MongoDB
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// modules
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const saveWeatherData = require('./utils/saveWeatherData')

// record the open weather data periodically
setInterval(saveWeatherData, 60 * 1000)

app.use(express.json())
app.use(cors())
app.use('/api/v1', routes)

// error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
