const User = require('../models/User')

const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('./asyncWrapper')

// maximum api calls limit per day
const MAX_CALL_PER_DAY = 25

// only allow the request that has valid apiKey
exports.protect = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ apiKey: req.header('x-api-key') })
  if (!user) return next(new ErrorRes(401, 'Unauthorized access'))
  req.user = user
  next()
})

// count api calls to prevent too many calls
exports.countCall = asyncWrapper(async (req, res, next) => {
  const todayInUTC = new Date((new Date()).toISOString().slice(0, 10))
  const usageIndex = req.user.usage.findIndex(usageEl => usageEl.date.getTime() === todayInUTC.getTime())
  const user = await User.findById(req.user._id)
  if (usageIndex === -1) {
    user.usage.push({ date: todayInUTC, count: 1 })
  } else {
    if (user.usage[usageIndex].count === MAX_CALL_PER_DAY) return next(new ErrorRes(429, 'Too many API calls'))
    user.usage[usageIndex].count++
  }
  user.save()
  next()
})
