const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { secret } = require('../config/environment')


function secureRoute(req, res, next) {
  if (!req.headers.authorization) throw new Error('Unauthorized')

  const token = req.headers.authorization.replace('Bearer ', '')

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) throw new Error('Unauthorized')
      req.currentUser = user
      next()
    })
    .catch(next)
}

module.exports = secureRoute
