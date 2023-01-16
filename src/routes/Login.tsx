import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { UserOutline, KeyOutline } from 'antd-mobile-icons'
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import { LoginRequest } from '~/src/services/login'
import { RootStoreContext } from '~/src/stores'
import logo from '~/src/assets/logo.svg'
import * as styles from './Login.module.less'

export default observer(() => {
  const { loginStore } = useContext(RootStoreContext)
  const navigate = useNavigate()
  const [loginDisabled, setLoginDisabled] = useState(false)

  const handleSubmit = (values: LoginRequest) => {
    loginStore.login(values).then(() => {
      setLoginDisabled(true)
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
    <div>
      <div className={styles.appTitle}>
        <img src={logo} />
        <div className={styles.greeting}>Welcome to Proton</div>
      </div>

      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        requiredMarkStyle="none"
        footer={
          <Button
            type="submit"
            color="primary"
            block
            loading={loginStore.loggingIn}
            disabled={loginDisabled}
          >
            Login
          </Button>
        }
        style={{
          '--prefix-width': '2em',
        }}
      >
        <Form.Item
          name="username"
          label={<UserOutline />}
          rules={[{ required: true, message: 'Username cannot be empty' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<KeyOutline />}
          rules={[{ required: true, message: 'Password cannot be empty' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
      </Form>
    </div>
  )
})
