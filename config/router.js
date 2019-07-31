const router = require('express').Router()
const movies = require('../controllers/movies')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/movies')
  .get(movies.index)
  .post(secureRoute, movies.create)

router.route('/movies/:id')
  .get(movies.show)
  .put(secureRoute, movies.edit)
  .delete(secureRoute, movies.delete)

router.route('/movies/:id/comments')
  .post(secureRoute, movies.commentCreate)

router.route('/movies/:id/comments/:commentId')
  .delete(secureRoute, movies.commentDelete)


router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not Found'}))

module.exports = router
