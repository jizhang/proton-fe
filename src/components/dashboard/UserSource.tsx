import React, { useState, useEffect } from 'react'
import { Chart, Axis, Geom, Legend } from 'bizcharts'
import _ from 'lodash'
import { getUserSource } from '~/src/services/dashboard'
import Tabs from './Tabs'
import './UserSource.less'

export default () => {
  const [measures, setMeasures] = useState<any[]>([])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    getUserSource().then(payload => {
      let { measures } = payload
      if (!_.isEmpty(measures)) {
        setMeasures(measures)
        setCurrent(measures[0].name)
      }
    })
  }, [])

  function handleChangeTab(key: string) {
    setCurrent(key)
  }

  function formatValue(value: number) {
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

  let tabs = _.map(measures, measure => {
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

  let measure = _.find(measures, ['name', current])
  let data = _.isUndefined(measure) ? [] : measure.data

  return (
    <div className="dashboard-user-source">
      <Tabs
        tabs={tabs}
        current={current}
        onChange={handleChangeTab}
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
                  return formatValue(Number(text))
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
