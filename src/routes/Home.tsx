import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd-mobile'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '~/src/stores'
import logo from '~/src/assets/logo.svg'
import './Home.css'

export default observer(() => {
  const { loginStore } = useContext(RootStoreContext)
  const navigate = useNavigate()

  function gotoDashboard() {
    navigate('/dashboard')
  }

  function handleLogin() {
    navigate('/login')
  }

  function handleLogout() {
    loginStore.logout()
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
        {loginStore.currentUser.id > 0 ? (
          <Button color="primary" onClick={handleLogout} block loading={loginStore.loggingOut}>
            Hi, {loginStore.currentUser.nickname}! Logout
          </Button>
        ) : (
          <Button color="primary" onClick={handleLogin} block>
            Login
          </Button>
        )}
        <Button color="primary" onClick={gotoDashboard} block>
          Dashboard
        </Button>
      </Space>
    </div>
  )
})
