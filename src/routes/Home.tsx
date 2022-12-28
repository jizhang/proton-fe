import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Space } from 'antd-mobile'
import './Home.css'
import logo from '../assets/logo.svg'

interface Props extends RouteComponentProps<any> {}

export default (props: Props) => {
  function gotoDashboard() {
    props.history.push('/dashboard')
  }

  function handleLogin() {
    props.history.push('/login')
  }

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>

    <Space direction="vertical" block>
      <Button color="primary" onClick={handleLogin} block>Login</Button>
      <Button color="primary" onClick={gotoDashboard} block>Dashboard</Button>
    </Space>
  </div>
  )
}
