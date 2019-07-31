const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  production: { type: String, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5},
  image: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  comments: [ commentSchema ],
  link: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
})

movieSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Movie', movieSchema)
