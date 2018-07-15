import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import { Dashboard } from './routes/Dashboard'

export default class App extends React.Component {
  public render () {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}
