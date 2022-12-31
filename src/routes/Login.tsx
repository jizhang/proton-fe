import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import * as loginService from '../services/login'
import './Login.less'
import logo from '../assets/logo.svg'

export default () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: any) => {
    setLoading(true)
    loginService.login(values).then(payload => {
      Toast.show({
        icon: 'success',
        content: `Welcome, ${payload.nickname}!`,
        afterClose: () => {
          navigate('/')
        },
      })
    }, () => {
      setLoading(false)
    })
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
          <Button
            type="submit"
            color="primary"
            block
            loading={loading}
          >Login</Button>
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
}
