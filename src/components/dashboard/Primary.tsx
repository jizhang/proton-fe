import * as React from 'react'
import { Chart, Axis, Geom } from 'bizcharts'
import DataSet from '@antv/data-set'
import * as _ from 'lodash'
import './Primary.less'

interface State {
  measures: any[],
  current: string,
  dv: any,
}

export default class Primary extends React.Component<any, State> {
  public readonly state: State = {
    measures: [],
    current: '',
    dv: null,
  }

  public componentDidMount() {
    let measures = [
      {
        name: 'users',
        label: 'Users',
        value: '1.3K',
        percent: '↑1.8%',
      },
      {
        name: 'sessions',
        label: 'Sessions',
        value: '1.5K',
        percent: '↑1.8%',
      },
      {
        name: 'bounce_rate',
        label: 'Bounce Rate',
        value: '91.51%',
        percent: '↓1.8%',
      },
      {
        name: 'session_duration',
        label: 'Session Duration',
        value: '0m 34s',
        percent: '↑6.8%',
      },
    ]

    let data = [
      { month: 'Jan', Tokyo: 7.0, London: 3.9 },
      { month: 'Feb', Tokyo: 6.9, London: 4.2 },
      { month: 'Mar', Tokyo: 9.5, London: 5.7 },
      { month: 'Apr', Tokyo: 14.5, London: 8.5 },
      { month: 'May', Tokyo: 18.4, London: 11.9 },
      { month: 'Jun', Tokyo: 21.5, London: 15.2 },
      { month: 'Jul', Tokyo: 25.2, London: 17.0 },
      { month: 'Aug', Tokyo: 26.5, London: 16.6 },
      { month: 'Sep', Tokyo: 23.3, London: 14.2 },
      { month: 'Oct', Tokyo: 18.3, London: 10.3 },
      { month: 'Nov', Tokyo: 13.9, London: 6.6 },
      { month: 'Dec', Tokyo: 9.6, London: 4.8 }
    ]

    let ds = new DataSet()
    let dv = ds.createView().source(data)
      .transform({
        type: 'fold',
        fields: ['Tokyo', 'London'],
        key: 'city',
        value: 'temperature',
      })

    this.setState({
      measures,
      current: measures[0].name,
      dv,
    })
  }

  private handleChangeMeasure = (measureName: string) => {
    this.setState({
      current: measureName,
    })
  }

  public render() {
    return (
      <div className="dashboard-primary">
        <div className="measure-list">
          {this.state.measures.map(measure => (
            <div
              className={`measure-item ${measure.name === this.state.current ? 'active' : ''}`}
              key={measure.name}
              onClick={() => this.handleChangeMeasure(measure.name)}
            >
              <div className="bar" />
              <div className="label">{measure.label}</div>
              <div className="value">{measure.value}</div>
              <div className="percent">{measure.percent}</div>
            </div>
          ))}
        </div>

        <div className="chart">
          <Chart
            height={240}
            forceFit={true}
            data={this.state.dv}
            padding={['auto', 'auto']}
          >
            <Axis name="month" />
            <Axis
              name="temperature"
              position="right"
              label={{
                formatter: (text: string) => `${text}℃`
              }}
            />
            <Geom type="line" position="month*temperature" color="city" />
          </Chart>
        </div>
      </div>
    )
  }
}
