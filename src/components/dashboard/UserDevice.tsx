import * as React from 'react'
import { Card } from 'antd-mobile-v2'
import { Chart, Coord, Geom } from 'bizcharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import * as request from '../../services/request'
import './UserDevice.less'

interface State {
  devices: any[],
}

export default class UserDevice extends React.Component<any, State> {
  public readonly state: State = {
    devices: [],
  }

  public componentDidMount() {
    request.get('/api/dashboard/userDevice').then(payload => {
      let { devices } = payload
      if (!_.isEmpty(devices)) {
         this.setState({
           devices: this.transformData(devices),
         })
      }
    })
  }

  private transformData(devices: any[]) {
    let totals = _(['current', 'previous'])
      .map(key => ([key, _(devices).map(key).sum()]))
      .fromPairs()
      .value()

    return _.map(devices, row => {
      _.forEach(['current', 'previous'], key => {
        row[`${key}_percent`] = row[key] / totals[key]
      })
      row.percent = this.formatPercent(row.current_percent, row.previous_percent)
      return row
    })
  }

  private formatPercent(current: number, previous: number) {
    let percent = _.round((current - previous) / previous * 100, 1)
    let formatted: string
    let color: string
    if (percent > 0) {
      formatted = '↑' + percent + '%'
      color = 'up'
    } else if (percent < 0) {
      formatted = '↓' + (-percent) + '%'
      color = 'down'
    } else {
      formatted = '0.0%'
      color = ''
    }
    return { formatted, color }
  }

  private formatPercentValue(value: number) {
    return _.round(value * 100, 1) + '%'
  }

  public render() {
    let iconMapping = {
      'iphone': 'mobile-alt',
      'ipad': 'tablet-alt',
    }
    let getIcon = (name: string) => _.get(iconMapping, name, 'desktop')
    return (
      <Card full={true} className="dashboard-user-device">
        <Card.Header
          title="Users by device"
          extra="1 day"
        />
        <Card.Body>
          <Chart
            forceFit={true}
            height={240}
            data={this.state.devices}
            padding={[-25, 0, -10, 0]}
          >
            <Coord type="theta" radius={0.75} innerRadius={0.6} />
            <Geom
              type="intervalStack"
              position="current"
              color="name"
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            />
          </Chart>
          <div className="device-list">
            {this.state.devices.map(device => (
              <div className="device-item" key={device.name}>
                <div className="icon">
                  <FontAwesomeIcon icon={getIcon(device.name)} />
                </div>
                <div className="label">{device.label}</div>
                <div className="value">{this.formatPercentValue(device.current_percent)}</div>
                <div className={`percent ${device.percent.color}`}>{device.percent.formatted}</div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    )
  }
}
