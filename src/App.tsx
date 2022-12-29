import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}
