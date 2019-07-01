import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './style.scss'


import Home from './components/common/Home'
import NavBar from './components/common/NavBar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import MoviesIndex from './components/movies/MoviesIndex'
import MoviesShow from './components/movies/MoviesShow'
import MoviesNew from './components/movies/MoviesNew'
import MoviesEdit from './components/movies/MoviesEdit'
import SecureRoute from './components/common/SecureRoute'

axios.get('/api/movies')
  .then(res => console.log(res.data))
  .catch(err => console.log(err))

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <SecureRoute path="/movies/:id/edit" component={MoviesEdit} />
          <SecureRoute path="/movies/new" component={MoviesNew} />
          <Route path="/movies/:id" component={MoviesShow} />
          <Route path="/movies" component={MoviesIndex} />
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
