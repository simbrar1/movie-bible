import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'

class MoviesShow extends React.Component {
  constructor() {
    super()

    this.state = { movies: null }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  componentDidMount() {
    this.getData()
  }

  handleChange(e) {
    this.setState({ comment: { text: e.target.value }})
  }

  getData() {
    axios.get(`/api/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err))
  }
  handleDelete() {
    axios.delete(`/api/movies/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/movies'))
      .catch(err => console.log(err.response))
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/movies/${this.props.match.params.id}/comments`,this.state.comment, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err.response))
  }

  isOwner() {
    return Auth.getPayload().sub === this.state.movies.user._id
  }

  isOwnerComment(comment) {
    return Auth.getPayload().sub === comment.user._id
  }

  handleCommentDelete(comment) {
    axios.delete(`/api/movies/${this.props.match.params.id}/comments/${comment._id}`, {
      headers: { 'Authorization': Auth.getToken()}
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movies) return null
    const { movies } =  this.state
    return (
      <main className="section">
        <div className="container">
          <h2 className="title">{movies.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="">
                <img src={movies.image} alt={movies.name} />
              </figure>
              <Link
                className="button is-left is-warning"
                to={`/movies/${movies._id}/edit`}
              >
                Edit
              </Link>
              <button onClick={this.handleDelete} className="button is-center is-danger ">Delete</button>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Year</h4>
              <p>{movies.year}</p>
              <hr />
              <h4 className="title is-4">Production</h4>
              <p>{movies.production}</p>
              <hr />
              <h4 className="title is-4">Star Rating</h4>
              <p>{movies.starRating}</p>
              <hr />
              <h4 className="title is-4">Description</h4>
              <p>{movies.description}</p>
              <hr />
              <h4 className="title is-4">Link</h4>
              <a href={movies.link} target="_blank" rel="noopener noreferrer">See more on IMDb</a>
            </div>
          </div>
          {movies.comments.map(comment => (
            <div key={comment._id} className="card">
              <div className="card-content">
                {comment.text} - {new Date(comment.createdAt).toLocaleString()}
              </div>
              {this.isOwnerComment(comment) && <button
                className="button is-danger"
                onClick={() => this.handleCommentDelete(comment)}
              >Delete
              </button>}
            </div>
          ))}
          <hr />
          {Auth.isAuthenticated() &&
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="What are your thoughts about this movie...."
                    onChange={this.handleChange}

                  >
                  </textarea>
                </div>
              </div>
              <button className="button" type="submit">Comment</button>
            </form>}
        </div>
      </main>
    )
  }
}

export default MoviesShow
