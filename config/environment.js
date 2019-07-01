const port = process.env.port || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/movies2'
const secret = process.env.SECRET || 'this is a secret'


module.exports = { port, dbURI, secret }
