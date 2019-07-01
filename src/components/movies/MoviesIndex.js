import React from 'react'
import axios from 'axios'

import MoviesCard from './MoviesCard'

class MoviesIndex extends React.Component {
  constructor() {
    super()

    this.state = { movies: null }
  }

  componentDidMount() {
    axios.get('/api/movies')
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movies) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.movies.map(movies => (
              <MoviesCard
                key={movies._id}
                {...movies}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default MoviesIndex
