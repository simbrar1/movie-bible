function errorHandler(err, req, res, next) {
  if (err.message === 'Not found') return res.status(404).json({ message: 'Not found'})

  if (err.message === 'Unauthorized') return res.status(401).json({ message: 'Unauthorized'})

  if (err.message === 'TokenExpiredError') return res.status(401).json({ message: 'Token Expired'})

  if (err.message === 'ValidationError') {
    const errors = {}

    for (const field in err.errors) {
      errors[field] = err.errors[field].message
    }
    return res.status(422).json({ message: 'Unprocessable Entity', errors})
  }
  next(err)

}


module.exports = errorHandler
