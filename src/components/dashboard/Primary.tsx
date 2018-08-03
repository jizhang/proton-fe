import * as React from 'react'
import * as _ from 'lodash'
import './Primary.less'

interface State {
  measures: any[],
  currentMeasure: string,
}

export default class Primary extends React.Component<any, State> {
  public readonly state: State = {
    measures: [],
    currentMeasure: '',
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

    this.setState({
      measures,
      currentMeasure: measures[0].name,
    })
  }

  private handleChangeMeasure = (measureName: string) => {
    this.setState({
      currentMeasure: measureName,
    })
  }

  public render() {
    return (
      <div className="dashboard-primary">
        <div className="measure-list">
          {this.state.measures.map(measure => (
            <div
              className={`measure-item ${measure.name === this.state.currentMeasure ? 'active' : ''}`}
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
      </div>
    )
  }
}
