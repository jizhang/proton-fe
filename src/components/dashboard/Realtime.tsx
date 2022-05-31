import * as React from 'react'
import { observer, inject } from 'mobx-react'
import * as _ from 'lodash'
import { Card } from 'antd-mobile-v2'
import { Chart, Geom } from 'bizcharts'
import CountUp from 'react-countup'
import DashboardStore from '../../stores/dashboard'
import './Realtime.less'

interface Props {
  dashboardStore?: DashboardStore,
}

@inject('dashboardStore')
@observer
export default class Realtime extends React.Component<Props> {
  private activeUserHandler: number

  public componentDidMount() {
    this.getActiveUser()
    this.activeUserHandler = window.setInterval(() => {
      this.getActiveUser()
    }, 5000)
  }

  public componentWillUnmount() {
    if (this.activeUserHandler) {
      window.clearInterval(this.activeUserHandler)
    }
  }

  private getActiveUser = () => {
    this.props.dashboardStore!.fetchActiveUser()
  }

  public render() {
    let { realtime } = this.props.dashboardStore!
    let data = _.map(realtime.minutes, (value, index) => {
      return { x: index, y: value }
    })

    return (
      <Card full={true} className="dashboard-realtime">
        <Card.Header
          title="Real time"
          extra="Last 5 minutes"
        />
        <Card.Body>
          <CountUp
            className="value-lg"
            start={realtime.previousCount}
            end={realtime.count}
            duration={2.75}
            separator=","
          />
          <div className="uv-title">Unique views per minute</div>
          <Chart forceFit={true} height={100} data={data} padding={[0, 0, 0, 8]}>
            <Geom type="interval" position="x*y" size={8} />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
