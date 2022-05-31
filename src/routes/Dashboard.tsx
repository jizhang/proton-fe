import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar, Icon, WhiteSpace } from 'antd-mobile-v2'
import Primary from '../components/dashboard/Primary'
import Realtime from '../components/dashboard/Realtime'
import UserSource from '../components/dashboard/UserSource'
import SourceRegion from '../components/dashboard/SourceRegion'
import VisitTime from '../components/dashboard/VisitTime'
import UserDevice from '../components/dashboard/UserDevice'
import UserRetention from '../components/dashboard/UserRetention'
import './Dashboard.less'

interface Props extends RouteComponentProps<any> {}

export default class Dashboard extends React.Component<Props> {
  private gotoHome = () => {
    this.props.history.push('/')
  }

  public render() {
    let cards = [
      { name: 'primary', component: <Primary /> },
      { name: 'realtime', component: <Realtime /> },
      { name: 'user_source', component: <UserSource /> },
      { name: 'world_geo', component: <SourceRegion /> },
      { name: 'visit_time', component: <VisitTime /> },
      { name: 'user_device', component: <UserDevice /> },
      { name: 'user_retention', component: <UserRetention /> },
    ]

    return (
      <div className="page-dashboard">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.gotoHome}
          rightContent={<Icon type="ellipsis" />}
          className="nav"
        >
          Dashboard
        </NavBar>

        <WhiteSpace style={{ marginTop: 45 }} />

        {cards.map(({ name, component }) => (
          <React.Fragment key={name}>
            {component}
            <WhiteSpace />
          </React.Fragment>
        ))}
      </div>
    )
  }
}
