import * as React from 'react'
import _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { WhiteSpace, List, InputItem, Button, WingBlank, Toast } from 'antd-mobile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createForm, createFormField } from 'rc-form'
import LoginStore from '../stores/login'
import './Login.less'
import logo from '../assets/logo.svg'

interface Props extends RouteComponentProps<any> {
  loginStore?: LoginStore,
  form: any,
}

class Login extends React.Component<Props> {
  public componentDidMount() {
    this.props.loginStore!.resetForm()
  }

  private handleLogin = () => {
    this.props.form.validateFields((error: any) => {
      if (!error) {
        this.props.loginStore!.login().then(() => {
          let { nickname } = this.props.loginStore!.currentUser
          Toast.success(`Welcome, ${nickname}!`, 1, () => {
            this.props.history.push('/')
          })
        }, _.noop)
      }
    })
  }

  private getFieldProps(name: string, fieldOptions: any) {
    let { form } = this.props.loginStore!
    let { getFieldProps } = this.props.form
    let props = getFieldProps(name, fieldOptions)
    return {
      ...props,
      error: !!form[name].errors,
      onErrorClick: () => {
        let message = form[name].errors[0].message
        Toast.info(message)
      }
    }
  }

  public render() {
    let { loggingIn } = this.props.loginStore!
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
            {...this.getFieldProps('username', {
              rules: [
                { required: true }
              ],
            })}
          >
            <div className="label-title">
              <FontAwesomeIcon icon="user" />
            </div>
          </InputItem>
          <InputItem
            placeholder="Password"
            type="password"
            {...this.getFieldProps('password', {
              rules: [
                { required: true },
              ],
            })}
          >
            <div className="label-title">
              <FontAwesomeIcon icon="key" />
            </div>
          </InputItem>
        </List>

        <WhiteSpace size="lg" />

        <WingBlank>
          <Button
            type="primary"
            onClick={this.handleLogin}
            loading={loggingIn}
          >
            Login
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default inject('loginStore')(observer(createForm({
  mapPropsToFields(props: Props) {
    let { form } = props.loginStore!
    return {
      username: createFormField(form.username.value),
      password: createFormField(form.password.value),
    }
  },
  onFieldsChange(props: Props, fields: any) {
    props.loginStore!.updateForm(fields)
  },
})(Login)))
