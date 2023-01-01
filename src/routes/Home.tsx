import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd-mobile'
import './Home.css'
import logo from '../assets/logo.svg'

export default () => {
  const navigate = useNavigate()

  function gotoDashboard() {
    navigate('/dashboard')
  }

  function handleLogin() {
    navigate('/login')
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
        <Button color="primary" onClick={handleLogin} block>
          Login
        </Button>
        <Button color="primary" onClick={gotoDashboard} block>
          Dashboard
        </Button>
      </Space>
    </div>
  )
}
