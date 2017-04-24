import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import GroupForm from './pages/groups/form'
import GroupShow from './pages/groups/show'

import VideoForm from './pages/videos/form'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <header className='ph4 pv2 bg-black-70 white'>
            <h1 className='f2 fw3'>JRS Videos - Admin</h1>
          </header>
          <main className='pa4'>
            <Route exact path='/' component={Home} />
            <Switch>
              <Route path='/groups/new' component={GroupForm} />
              <Route path='/groups/:type/:id' component={GroupShow} />
            </Switch>
            <Switch>
              <Route path='/videos/new' component={VideoForm} />
              <Route path='/videos/:type/:id/edit' component={VideoForm} />
            </Switch>
          </main>
          <footer className='pa4 tc'>
            <div className='f6 fw4'>Cant find a video?</div>
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
