import * as React from 'react'
import { Button } from 'antd-mobile'
import './Home.css'

import logo from '../assets/logo.svg'

export const Home: React.SFC<any> = (props) => {
  let gotoDashboard = () => props.history.push('/dashboard')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Button type="primary" onClick={gotoDashboard}>Dashboard</Button>
    </div>
  )
}
