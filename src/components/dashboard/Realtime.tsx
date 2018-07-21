import * as React from 'react'
import * as _ from 'lodash'
import { Card } from 'antd-mobile'
import { Chart, Geom } from 'bizcharts'
import { formatNumber } from '../../services/util'
import './Realtime.less'

interface State {
  count: number,
  minutes: number[],
}

export default class Realtime extends React.Component<any, State> {
  public readonly state: State = {
    count: 0,
    minutes: [],
  }

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
    fetch('/api/dashboard/activeUser')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          ...responseJson.payload
        })
      })
  }

  public render() {
    let data = _.map(this.state.minutes, (value, index) => {
      return { x: index, y: value }
    })

    return (
      <Card full={true} className="dashboard-realtime">
        <Card.Header
          title="Real time"
          extra="Last 5 minutes"
        />
        <Card.Body>
          <div className="value-lg">{formatNumber(this.state.count)}</div>
          <div className="uv-title">Unique views per minute</div>
          <Chart forceFit={true} height={100} data={data} padding={[0, 0, 0, 8]}>
            <Geom type="interval" position="x*y" size={8} />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
