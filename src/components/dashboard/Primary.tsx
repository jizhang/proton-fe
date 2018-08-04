import * as React from 'react'
import { Chart, Axis, Geom } from 'bizcharts'
import DataSet from '@antv/data-set'
import * as _ from 'lodash'
import moment from 'moment'
import './Primary.less'

interface State {
  measures: any[],
  current: string,
}

export default class Primary extends React.Component<any, State> {
  public readonly state: State = {
    measures: [],
    current: '',
  }

  private formatValue(value: number, format: string) {
    let formatted: string
    if (format === 'percent') {
      formatted = _.round(value * 100, 2) + '%'
    } else if (format === 'interval') {
      if (value < 60) {
        formatted = '0m ' + _.round(value) + 's'
      } else if (value < 3600) {
        formatted = _.round(value / 60) + 'm ' + _.round(value % 60) + 's'
      } else {
        formatted = _.round(value / 3600) + 'h ' + _.round(value % 3600 / 60) + 'm'
      }
    } else {
      if (value < 1000) {
        formatted = String(_.round(value))
      } else if (value < 1000 ** 2) {
        formatted = _.round(value / 1000, 1) + 'K'
      } else if (value < 1000 ** 3) {
        formatted = _.round(value / 1000 ** 2, 1) + 'M'
      } else {
        formatted = _.round(value / 1000 ** 3, 1) + 'B'
      }
    }
    return formatted
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

  private createDataView(data: any[]) {
    return new DataSet.View()
      .source(data)
      .transform({
        type: 'fold',
        fields: ['current', 'previous'],
        key: 'key',
        value: 'value',
      })
  }

  public componentDidMount() {
    fetch('/api/dashboard/primaryData')
      .then(response => response.json())
      .then(responseJson => {
        let measures = _.map(responseJson.payload.measures, measure => {
          let value = '-'
          let percent = { formatted: '-', color: '' }
          let dv = null
          let max = null

          if (!_.isEmpty(measure.data)) {
            let { current, previous } = measure.data[0]
            value = this.formatValue(current, measure.format)
            percent = this.formatPercent(current, previous)
            dv = this.createDataView(measure.data)
            max = _(dv.rows).map('value').max()
          }

          return {
            name: measure.name,
            label: measure.label,
            format: measure.format,
            value,
            percent,
            dv,
            max,
          }
        })

        this.setState({
          measures,
          current: _.isEmpty(measures) ? '' : measures[0].name,
        })
      })
  }

  private handleChangeMeasure = (measureName: string) => {
    this.setState({
      current: measureName,
    })
  }

  public render() {
    let scale: any = {
      date: {
        type: 'time',
        mask: 'M.D',
      },
      value: {
        min: 0,
      },
    }

    let dv = null
    let current = _.find(this.state.measures, ['name', this.state.current])
    if (current && current.dv) {
      dv = current.dv
      scale.value.max = current.max
    }

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
              <div className={`percent ${measure.percent.color}`}>{measure.percent.formatted}</div>
            </div>
          ))}
        </div>

        <div className="chart">
          <Chart
            height={240}
            forceFit={true}
            data={dv}
            padding={['auto', 'auto']}
            scale={scale}
          >
            <Axis name="date" />
            <Axis
              name="value"
              position="right"
              label={{
                formatter: (text: string) => {
                  if (current) {
                    return this.formatValue(Number(text), current.format)
                  } else {
                    return text
                  }
                },
              }}
            />
            <Geom
              type="line"
              position="date*value"
              color="key"
              style={['key', {
                lineDash(key: any) {
                  return key === 'previous' ? [3, 3] : []
                },
                lineWidth(key: any) {
                  return key === 'previous' ? 1 : 1.5
                },
              }]}
            />
          </Chart>
        </div>
      </div>
    )
  }
}
