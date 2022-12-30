import React, { useEffect, useState } from 'react'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import * as request from '~/src/common/request'
import Tabs from './Tabs'
import './Primary.less'

export default () => {
  const [measures, setMeasures] = useState<any[]>([])
  const [current, setCurrent] = useState('')

  function formatValue(value: number, format: string, short: boolean = false) {
    let formatted: string
    if (format === 'percent') {
      formatted = _.round(value * 100, 1) + '%'
    } else if (format === 'interval') {
      if (value < 60) {
        formatted = '0m ' + _.round(value) + 's'
      } else if (value < 3600) {
        formatted = _.round(value / 60) + 'm ' + _.round(value % 60) + 's'
      } else {
        formatted = _.round(value / 3600) + 'h ' + _.round(value % 3600 / 60) + 'm'
      }
    } else if (short) {
      if (value < 1000) {
        formatted = String(_.round(value))
      } else if (value < 1000 ** 2) {
        formatted = _.round(value / 1000, 1) + 'K'
      } else if (value < 1000 ** 3) {
        formatted = _.round(value / 1000 ** 2, 1) + 'M'
      } else {
        formatted = _.round(value / 1000 ** 3, 1) + 'B'
      }
    } else {
      formatted = numeral(value).format('0,0')
    }
    return formatted
  }

  function formatPercent(current: number, previous: number) {
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

  function transformData(data: any[]) {
    return _.flatMap(data, item => {
      return _.map(['current', 'previous'], key => {
        return {
          date: item.date,
          key,
          value: item[key],
          dateKey: `${item.date}|${key}`,
        }
      })
    })
  }

  useEffect(() => {
    request.get('/api/dashboard/primaryData').then(payload => {
      let measures = _.map(payload.measures, measure => {
        let value = '-'
        let percent = { formatted: '-', color: '' }
        let dv: any[] | null = null
        let max: number | null = null

        if (!_.isEmpty(measure.data)) {
          let { current, previous } = _.last(measure.data as any[])
          value = formatValue(current, measure.format, true)
          percent = formatPercent(current, previous)
          dv = transformData(measure.data)
          max = _.round(_(dv).map('value').max() * 1.1)
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

      setMeasures(measures)
      setCurrent(_.isEmpty(measures) ? '' : measures[0].name)
    })
  }, [])

  function handleChangeMeasure(measureName: string) {
    setCurrent(measureName)
  }

  let scale: any = {
    date: {
      type: 'time',
      mask: 'M.D',
    },
    value: {
      min: 0,
    },
  }

  let dv = []
  let measure = _.find(measures, ['name', current])
  if (measure && measure.dv) {
    dv = measure.dv
    scale.value.max = measure.max
  }

  let tabs = _.map(measures, measure => {
    return {
      key: measure.name,
      element: (
        <div className={`measure-item ${current === measure.name ? 'active' : ''}`}>
          <div className="label">{measure.label}</div>
          <div className="value">{measure.value}</div>
          <div className={`percent ${measure.percent.color}`}>{measure.percent.formatted}</div>
        </div>
      )
    }
  })

  return (
    <div className="dashboard-primary">
      <Tabs
        tabs={tabs}
        current={current}
        onChange={handleChangeMeasure}
      />

      <div className="chart">
        <Chart
          height={240}
          autoFit
          data={dv}
          padding="auto"
          scale={scale}
        >
          <Axis name="date" />
          <Axis
            name="value"
            position="right"
            label={{
              formatter: (text: string) => {
                if (measure) {
                  return formatValue(Number(text), measure.format, true)
                } else {
                  return text
                }
              },
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="line"
            position="date*value"
            color="key"
            style={['key', (key) => {
              return {
                lineDash: key === 'previous' ? [3, 3] : [],
                lineWidth: key === 'previous' ? 1 : 1.5,
              }
            }]}
            tooltip={['dateKey*value', (dateKey, value) => {
              let [date, key] = dateKey.split('|')
              let name: string
              if (key === 'previous') {
                name = moment(date).subtract(7, 'days').format('M.D')
              } else {
                name = moment(date).format('M.D')
              }

              return {
                name,
                value: formatValue(value, measure.format, false),
              }
            }]}
          />
        </Chart>
      </div>
    </div>
  )
}
