const { validate } = require('email-validator')
const User = require('../models/User')

const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('../middleware/asyncWrapper')

// @desc      User registration and get apiKey
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncWrapper(async (req, res, next) => {
  let user
  // validation
  if (!req.body.email || !validate(req.body.email)) return next(new ErrorRes(400, 'Please provide correct email'))

  user = await User.findOne({ email: req.body.email })
  if (user) return next(new ErrorRes(400, 'Email is in use'))
  // register
  user = await User.create({
    email: req.body.email,
    apiKey: genApiKey(),
    host: req.headers.host,
    usage: []
  })
  return res.status(201).json({
    status: 'success',
    data: user
  })
})

/**
 * Functions
 */
// create a base-36 string that is always 20 chars long a-z0-9
function genApiKey () {
  return [...Array(20)]
    .map(_ => ((Math.random() * 36) | 0).toString(36))
    .join('')
}
