import * as React from 'react'
import _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { WhiteSpace, List, InputItem, Button, WingBlank, Toast } from 'antd-mobile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginStore from '../stores/login'
import './Login.less'
import logo from '../assets/logo.svg'

interface Props extends RouteComponentProps<any> {
  loginStore?: LoginStore,
}

@inject('loginStore')
@observer
export default class Login extends React.Component<Props> {
  public componentDidMount() {
    this.props.loginStore!.resetForm()
  }

  private handleLogin = () => {
    this.props.loginStore!.login().then(() => {
      let { nickname } = this.props.loginStore!.currentUser
      Toast.success(`Welcome, ${nickname}!`, 1, () => {
        this.props.history.push('/')
      })
    }, _.noop)
  }

  private handleChangeUsername = (value: string) => {
    this.props.loginStore!.updateForm({
      username: value,
    })
  }

  private handleChangePassword = (value: string) => {
    this.props.loginStore!.updateForm({
      password: value,
    })
  }

  public render() {
    let { form } = this.props.loginStore!
    return (
      <div className="page-login">
        <div className="app-title">
          <img src={logo} />
          <div className="greeting">Welcome to Proton</div>
        </div>

        <WhiteSpace size="lg" />

        <List>
          <InputItem
            placeholder="Username"
            value={form.username}
            onChange={this.handleChangeUsername}
          >
            <div className="label-title">
              <FontAwesomeIcon icon="user" />
            </div>
          </InputItem>
          <InputItem
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={this.handleChangePassword}
          >
            <div className="label-title">
              <FontAwesomeIcon icon="key" />
            </div>
          </InputItem>
        </List>

        <WhiteSpace size="lg" />

        <WingBlank>
          <Button type="primary" onClick={this.handleLogin}>Login</Button>
        </WingBlank>
      </div>
    )
  }
}
