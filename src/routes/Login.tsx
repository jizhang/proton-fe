import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar, Icon, WhiteSpace } from 'antd-mobile'
import './Login.less'

interface Props extends RouteComponentProps<any> {}

export default class Login extends React.Component<Props> {
  private gotoHome = () => {
    this.props.history.push('/')
  }

  public render() {
    return (
      <div className="page-login">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.gotoHome}
          rightContent={<Icon type="ellipsis" />}
          className="nav"
        >
          Login
        </NavBar>

        login
      </div>
    )
  }
}
