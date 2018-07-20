import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar, Icon, Card, WhiteSpace } from 'antd-mobile'
import Realtime from '../components/dashboard/Realtime'
import './Dashboard.less'

interface Props extends RouteComponentProps<any> {}

export default class Dashboard extends React.Component<Props> {
  private gotoHome = () => {
    this.props.history.push('/')
  }

  public render() {
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

        <WhiteSpace size="sm" style={{ marginTop: 45 }} />

        <Realtime />

        <WhiteSpace size="sm" />

        <Card full={true}>
          <Card.Header
            title="Users by time of day"
            extra={<span>1 week</span>}
          />
          <Card.Body>
            <div className="value-lg">1,400,00</div>
            <div className="chart-holder" />
          </Card.Body>
        </Card>

        <WhiteSpace size="sm" />

        <Card full={true}>
          <Card.Header
            title="Users by location"
            extra={<span>1 day</span>}
          />
          <Card.Body>
            <div className="chart-holder" />
          </Card.Body>
        </Card>

        <WhiteSpace size="sm" />
      </div>
    )
  }
}
