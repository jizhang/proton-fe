import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar } from 'antd-mobile'
import Primary from '../components/dashboard/Primary'
import Realtime from '../components/dashboard/Realtime'
import UserSource from '../components/dashboard/UserSource'
import SourceRegion from '../components/dashboard/SourceRegion'
import VisitTime from '../components/dashboard/VisitTime'
import UserDevice from '../components/dashboard/UserDevice'
import UserRetention from '../components/dashboard/UserRetention'
import './Dashboard.less'

interface Props extends RouteComponentProps<any> {}

export default (props: Props) => {
  const cards = [
    { name: 'primary', component: <Primary /> },
    { name: 'realtime', component: <Realtime /> },
    { name: 'user_source', component: <UserSource /> },
    { name: 'world_geo', component: <SourceRegion /> },
    { name: 'visit_time', component: <VisitTime /> },
    { name: 'user_device', component: <UserDevice /> },
    { name: 'user_retention', component: <UserRetention /> },
  ]

  const gotoHome = () => {
    props.history.push('/')
  }

  return (
    <div className="page-dashboard">
      <NavBar
        className="nav"
        onBack={gotoHome}
      >
        Dashboard
      </NavBar>

      <div className="divider" style={{ marginTop: '45px' }}></div>

      {cards.map(({ name, component }) => (
        <React.Fragment key={name}>
          {component}
          <div className="divider"></div>
        </React.Fragment>
      ))}
    </div>
  )
}
