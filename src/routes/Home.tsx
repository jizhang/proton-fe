import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd-mobile'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '~/src/stores'
import logo from '~/src/assets/logo.svg'
import * as styles from './Home.module.css'

export default observer(() => {
  const { loginStore } = useContext(RootStoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    loginStore.getCurrentUser()
  }, [])

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
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <h1 className={styles['App-title']}>Welcome to React</h1>
      </header>
      <p className={styles['App-intro']}>
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
        <Button
          color="primary"
          block
          onClick={() => {
            navigate('/realtime')
          }}
        >
          Realtive Overview
        </Button>
      </Space>
    </div>
  )
})
