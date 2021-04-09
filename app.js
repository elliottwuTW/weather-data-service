const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT

setInterval(() => console.log('welcome to Node'), 1000)

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
