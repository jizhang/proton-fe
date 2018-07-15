import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Button } from 'antd-mobile'
import './Home.css'

import logo from '../assets/logo.svg'

interface Props extends RouteComponentProps<any> {}

export default class Home extends React.Component<Props> {
  private gotoDashboard = () => {
    this.props.history.push('/dashboard')
  }

  public render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Button type="primary" onClick={this.gotoDashboard}>Dashboard</Button>
    </div>
    )
  }
}
