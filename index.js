const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const { dbURI, port } = require('./config/environment')
const router = require('./config/router')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')

mongoose.connect(dbURI, { useNewUrlParser: true })
//hooking up to the database - this needs to be done first

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.use(errorHandler)

app.listen(port, () => console.log(`App is listening on port ${port}`))
