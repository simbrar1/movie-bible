const Movie = require('../models/movie')

//index
function indexRoute(req, res, next) {
  Movie
    .find(req.query)
    .populate('user')
    .then(movie => res.status(200).json(movie))
    .catch(next)
}

//show
function showRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(movie => {
      if (!movie) throw new Error('Not found')
      return res.status(200).json(movie)
    })
    .catch(next)
}

//Create
function createRoute(req, res, next) {
  req.body.user = req.currentUser
  Movie
    .create(req.body)
    .then(movie => res.status(201).json(movie))
    .catch(next)
}

//edit
function editRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .then(movie => {
      if (!movie) throw new Error('Not Found')
      if (!movie .user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      Object.assign(movie, req.body)
      return movie.save()
    })
    .then(movie => res.status(202).json(movie))
    .catch(next)
}

//delete
function deleteRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .then(movie => {
      if (!movie.user.equals(req.currentUser._id))
        throw new Error('Unauthorized')
      return movie.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}


function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Movie
    .findById(req.params.id)
    .then(movie => {
      if (!movie) throw new Error('not found')
      movie.comments.push(req.body)
      return movie.save()
    })
    .then(movie => res.status(201).json(movie))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .then(movie => {
      if (!movie) throw new Error('Not found')
      const comment = movie.comments.id(req.params.commentId)
      if (!comment) throw new Error('Not found')
      if (!comment.user.equals(req.currentUser._id))
        throw new Error('Unauthorized')
      comment.remove()
      return movie.save()
    })
    .then(movie =>
      res.status(200).json(movie))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
