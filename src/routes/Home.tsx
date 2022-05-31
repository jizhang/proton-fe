import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { Button, Space } from 'antd-mobile'
import LoginStore from '../stores/login'
import './Home.css'

import logo from '../assets/logo.svg'

interface Props extends RouteComponentProps<any> {
  loginStore?: LoginStore,
}

@inject('loginStore')
@observer
export default class Home extends React.Component<Props> {
  private gotoDashboard = () => {
    this.props.history.push('/dashboard')
  }

  private handleLogin = () => {
    this.props.history.push('/login')
  }

  private handleLogout = () => {
    this.props.loginStore!.logout()
  }

  public render() {
    let { currentUser, loggingOut } = this.props.loginStore!
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
        {currentUser.id > 0 ? (
          <Button
            color="primary"
            onClick={this.handleLogout}
            loading={loggingOut}
            block
          >
            Hi {currentUser.nickname}! Logout
          </Button>
        ) : (
          <Button color="primary" onClick={this.handleLogin} block>Login</Button>
        )}
        <Button color="primary" onClick={this.gotoDashboard} block>Dashboard</Button>
      </Space>
    </div>
    )
  }
}
