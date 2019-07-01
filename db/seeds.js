const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Movie = require('../models/movie')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'hi',
          email: 'hi@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }, {
          username: 'no',
          email: 'no@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(users => {
      console.log(`${users.length} users created`)
      return Movie.create([
        {
          name: 'Bridget Jones',
          year: '2001',
          production: 'Universal',
          starRating: 3.9,
          image: 'https://images-na.ssl-images-amazon.com/images/I/51BRM4GZRQL._SY445_.jpg',
          description: 'Bridget Jones is alcoholic binger, smoker, overweight thirty-something British woman who tries to keep things in order and while also dealing with her job as a publisher. When she attends a Christmas party with her parents, they try to set her up with their neighbours son, Mark.',
          link: 'https://www.imdb.com/title/tt0243155/?ref_=fn_al_tt_1',
          user: users[0]
        }, {
          name: 'Legend',
          year: '2015',
          production: 'Universal',
          starRating: 3.1,
          image: 'https://is5-ssl.mzstatic.com/image/thumb/Video/v4/42/5c/d6/425cd60d-e3ae-8b6a-62d1-fc06bc7233a6/pr_source.lsr/268x0w.png',
          description: 'Legend is a 2015 biographical crime thriller film[7] written and directed by American director Brian Helgeland. It is adapted from John Pearson book The Profession of Violence: The Rise and Fall of the Kray Twins, which deals with their rise and fall, the relationship that bound them together, and follows their gruesome career to imprisonment for life in 1969.',
          link: 'https://www.imdb.com/title/tt3569230/?ref_=fn_al_tt_1',
          user: users[0]
        }, {
          name: 'The Interview',
          year: '2014',
          production: 'Sony Pictures',
          starRating: 4.2,
          image: 'https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_.jpg',
          description: 'Dave Skylark and his producer Aaron Rapaport run the celebrity tabloid show "Skylark Tonight". When they land an interview with a surprise fan, North Korean dictator Kim Jong-un, they are recruited by the CIA to assassinate him.',
          link: 'https://www.imdb.com/title/tt2788710/?ref_=fn_al_tt_1',
          user: users[1]
        }, {
          name: 'Braveheart',
          year: '1995',
          production: 'Paramount Pictures',
          starRating: 5,
          image: 'https://images-na.ssl-images-amazon.com/images/I/715aBDrTg1L._SL1500_.jpg',
          description: 'When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt against King Edward I of England.',
          link: 'https://www.imdb.com/title/tt0112573/?ref_=nv_sr_1?ref_=nv_sr_1',
          user: users[1]
        }, {
          name: 'Gladiator',
          year: '2000',
          production: 'Paramount Pictures',
          starRating: 4.9,
          image: 'https://images-na.ssl-images-amazon.com/images/I/51o9U06EV8L.jpg',
          description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
          link: 'https://www.imdb.com/title/tt0172495/?ref_=nv_sr_1?ref_=nv_sr_1',
          user: users[1]
        }, {
          name: 'Cold Mountain',
          year: '2003',
          production: 'Paramount Pictures',
          starRating: 4.9,
          image: 'https://images-na.ssl-images-amazon.com/images/I/81oeKKl60EL._RI_.jpg',
          description: 'In the waning days of the American Civil War, a wounded soldier embarks on a perilous journey back home to Cold Mountain, North Carolina to reunite with his sweetheart.',
          link: 'https://www.imdb.com/title/tt0159365/?ref_=nv_sr_1?ref_=nv_sr_1',
          user: users[1]
        }
      ])
    })
    .then(movies => console.log(`${movies.length} movies created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())

})
