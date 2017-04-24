import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home'
import Cards from './pages/videos/cards'
import ShowVideo from './pages/videos/show'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/groups/:type/:id' component={Cards} />
          <Route path='/show/:id' component={ShowVideo} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
