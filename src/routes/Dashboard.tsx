import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar, Icon, WhiteSpace } from 'antd-mobile'
import Primary from '../components/dashboard/Primary'
import Realtime from '../components/dashboard/Realtime'
import VisitTime from '../components/dashboard/VisitTime'
import SourceRegion from '../components/dashboard/SourceRegion'
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
      { name: 'visit_time', component: <VisitTime /> },
      { name: 'world_geo', component: <SourceRegion /> },
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
