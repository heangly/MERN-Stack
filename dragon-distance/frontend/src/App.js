import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Register from './pages/Register'
import About from './pages/About'
import Alert from './pages/Alert'

const App = () => {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/about' component={About} />
          <Route exact path='/alert' component={Alert} />
          <Route exact path='/' component={Auth} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
