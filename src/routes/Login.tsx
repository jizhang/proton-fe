import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import { LoginRequest } from '~/src/services/login'
import { RootStoreContext } from '~/src/stores'
import logo from '~/src/assets/logo.svg'
import './Login.less'

export default observer(() => {
  const { loginStore } = useContext(RootStoreContext)
  const navigate = useNavigate()

  const handleSubmit = (values: LoginRequest) => {
    loginStore.login(values).then(() => {
      Toast.show({
        icon: 'success',
        content: `Welcome, ${loginStore.currentUser.nickname}!`,
        afterClose: () => {
          navigate('/')
        },
      })
    }, _.noop)
  }

  return (
    <div className="page-login">
      <div className="app-title">
        <img src={logo} />
        <div className="greeting">Welcome to Proton</div>
      </div>

      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        footer={
          <Button type="submit" color="primary" block loading={loginStore.loggingIn}>
            Login
          </Button>
        }
      >
        <Form.Item name="username" label="Username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
      </Form>
    </div>
  )
})
