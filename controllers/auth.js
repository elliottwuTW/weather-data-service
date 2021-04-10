const { validate } = require('email-validator')
const User = require('../models/User')

const ErrorRes = require('../utils/ErrorRes')

// @desc      User registration and get apiKey
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  let user
  try {
    // validation
    if (!req.body.email || !validate(req.body.email)) return next(new ErrorRes(400, 'Please provide correct email'))

    user = await User.findOne({ email: req.body.email })
    if (user) return next(new ErrorRes(400, 'Email is in use'))
    // register
    const today = (new Date()).toISOString().slice(0, 10)
    user = await User.create({
      email: req.body.email,
      apiKey: genApiKey(),
      host: req.headers.host,
      usage: [{ date: new Date(today), count: 0 }]
    })
    return res.status(201).json({
      status: 'success',
      data: user
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Functions
 */
// create a base-36 string that is always 20 chars long a-z0-9
function genApiKey () {
  return [...Array(20)]
    .map(_ => ((Math.random() * 36) | 0).toString(36))
    .join('')
}
