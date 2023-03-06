import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import Users from '../components/realtime/Users'
import * as styles from './Dashboard.module.less'

export default () => {
  const navigate = useNavigate()

  const cards = [{ name: 'realtime', component: <Users /> }]

  const gotoHome = () => {
    navigate('/')
  }

  return (
    <div className={styles.dashboard}>
      <NavBar className={styles.nav} onBack={gotoHome}>
        Realtime Overview
      </NavBar>

      <div className={styles.divider} style={{ marginTop: '45px' }}></div>

      {cards.map(({ name, component }) => (
        <React.Fragment key={name}>
          {component}
          <div className={styles.divider}></div>
        </React.Fragment>
      ))}
    </div>
  )
}
