const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  city_en: {
    type: String,
    required: true
  },
  windSpeed: {
    type: String,
    required: true
  },
  temperature: {
    type: String,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
  pressure: {
    type: String,
    required: true
  },
  maxTemp: {
    type: String,
    required: true
  },
  minTemp: {
    type: String,
    required: true
  },
  weather: {
    type: String,
    required: true
  },
  obsTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Record', recordSchema)
