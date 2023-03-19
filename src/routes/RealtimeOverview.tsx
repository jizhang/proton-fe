import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import Users from '../components/realtime/Users'
import Acquisition from '../components/realtime/Acquisition'
import Audience from '../components/realtime/Audience'
import PageTitle from '../components/realtime/PageTitle'
import EventCount from '../components/realtime/EventCount'
import EventConversion from '../components/realtime/EventConversion'
import UserProperty from '../components/realtime/UserProperty'
import * as styles from './Dashboard.module.less'

export default () => {
  const navigate = useNavigate()

  const cards = [
    { name: 'users', component: <Users /> },
    { name: 'acquisition', component: <Acquisition /> },
    { name: 'audience', component: <Audience /> },
    { name: 'pageTitle', component: <PageTitle /> },
    { name: 'eventCount', component: <EventCount /> },
    { name: 'eventConversion', component: <EventConversion /> },
    { name: 'userProperty', component: <UserProperty /> },
  ]

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
