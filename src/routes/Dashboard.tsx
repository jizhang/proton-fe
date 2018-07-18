import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { NavBar, Icon, Card, WhiteSpace } from 'antd-mobile'
import numeral from 'numeral'
import './Dashboard.less'

interface Props extends RouteComponentProps<any> {}

interface State {
  count: number,
}

export default class Dashboard extends React.Component<Props, State> {
  public readonly state: State = {
    count: 0,
  }

  public componentDidMount() {
    fetch('/api/dashboard/activeUser')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          count: responseJson.payload.count
        })
      })
  }

  private gotoHome = () => {
    this.props.history.push('/')
  }

  private formatNumber(value: number) {
    if (!value) {
      return '-'
    }
    return numeral(value).format('0,0')
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

        <Card full={true}>
          <Card.Header
            title="Real time"
            extra="Last 5 minutes"
          />
          <Card.Body>
            <div className="value-lg">{this.formatNumber(this.state.count)}</div>
            <div className="chart-holder" />
          </Card.Body>
        </Card>

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
