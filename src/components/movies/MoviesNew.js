import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import MoviesForm from './MoviesForm'

class MoviesNew extends React.Component {
  constructor() {
    super()


    this.state = { data: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log('submitted')
    // console.log(this.state.data)

    axios.post('/api/movies', this.state.data,{
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/movies'))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <MoviesForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }

}

export default MoviesNew
