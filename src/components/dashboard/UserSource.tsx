import * as React from 'react'
import { Chart, Axis, Geom, Legend } from 'bizcharts'
import _ from 'lodash'
import * as request from '../../services/request'
import Tabs from './Tabs'
import './UserSource.less'

interface State {
  measures: any[],
  current: string,
}

export default class UserSource extends React.Component<any, State> {
  public readonly state: State = {
    current: '',
    measures: [],
  }

  public componentDidMount() {
    request.get('/api/dashboard/userSource').then(payload => {
      let { measures } = payload
      if (!_.isEmpty(measures)) {
        let current = measures[0].name
        this.setState({ measures, current })
      }
    })
  }

  private handleChangeTab = (key: string) => {
    this.setState({ current: key })
  }

  private formatValue(value: number) {
    let formatted: string
    if (value < 1000) {
      formatted = String(_.round(value))
    } else if (value < 1000 ** 2) {
      formatted = _.round(value / 1000, 1) + 'K'
    } else if (value < 1000 ** 3) {
      formatted = _.round(value / 1000 ** 2, 1) + 'M'
    } else {
      formatted = _.round(value / 1000 ** 3, 1) + 'B'
    }
    return formatted
  }

  public render() {
    let tabs = _.map(this.state.measures, measure => {
      return {
        key: measure.name,
        element: measure.label,
      }
    })

    let scale: any = {
      date: {
        type: 'time',
        mask: 'M.D',
      },
      value: {
        min: 0,
      },
    }

    let current = _.find(this.state.measures, ['name', this.state.current])
    let data = _.isUndefined(current) ? [] : current.data

    return (
      <div className="dashboard-user-source">
        <Tabs
          tabs={tabs}
          current={this.state.current}
          onChange={this.handleChangeTab}
        />
        <div style={{ padding: '0 15px 10px 15px' }}>
          <Chart
            autoFit
            height={240}
            data={data}
            padding="auto"
            scale={scale}
          >
            <Axis name="date" />
            <Axis
              name="value"
              position="right"
              label={{
                formatter: (text: string) => {
                  if (current) {
                    return this.formatValue(Number(text))
                  } else {
                    return text
                  }
                },
              }}
            />
            <Legend />
            <Geom
              type="interval"
              adjust="stack"
              position="date*value"
              color="key"
            />
          </Chart>
        </div>
      </div>
    )
  }
}
