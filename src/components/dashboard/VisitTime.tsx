import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Axis, Legend } from 'bizcharts'
import _ from 'lodash'
import moment from 'moment'
import { getActiveHourlyUsers } from '~/src/services/dashboard'

export default () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getActiveHourlyUsers().then((payload) => {
      setData(transformData(payload.data))
    })
  }, [])

  function transformData(data: { report_hour: string; user_count: number }[]) {
    const dataMap = _(data)
      .map((i) => [i.report_hour, i.user_count])
      .fromPairs()
      .value()
    const startDate = moment().startOf('day').subtract(7, 'days')
    return _.times(7 * 24, (i) => {
      const dt = moment(startDate).add(i, 'hours')
      const x = dt.isoWeekday() - 1
      const y = 23 - dt.hour()
      const value = _.get(dataMap, dt.format('YYYY-MM-DD HH:00:00'), 0)
      return { x, y, value }
    })
  }

  const scale = {
    x: {
      type: 'cat',
      values: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 0 - 6
    },
    y: {
      type: 'cat',
      values: [
        '11pm', // 0 -> 23:00
        '10pm',
        '9pm',
        '8pm',
        '7pm',
        '6pm',
        '5pm',
        '4pm',
        '3pm',
        '2pm',
        '1pm',
        '12pm', // 11 -> 12:00
        '11am',
        '10am',
        '9am',
        '8am',
        '7am',
        '6am',
        '5am',
        '4am',
        '3am',
        '2am',
        '1am',
        '12am', // 23 -> 00:00
      ],
    },
  }

  const legendItemFormatter = (item: number): string | number => {
    if (Math.abs(item) >= 1000) {
      const itemK = Math.round(item / 1000)
      return `${itemK}k`
    }
    return item
  }

  return (
    <Card title="Users by time of day" extra={<span>1 week</span>} style={{ borderRadius: 0 }}>
      <Chart data={data} height={450} padding={[0, 45, 50, 0]} scale={scale} autoFit>
        <Axis
          name="y"
          position="right"
          label={{
            style: {
              textAlign: 'right',
            },
            offset: 45,
            formatter(text, item, index) {
              return index % 2 === 0 ? '' : text
            },
          }}
        />
        <Axis name="x" tickLine={{ length: 0 }} />
        <Legend slidable={false} itemFormatter={legendItemFormatter} />
        <Geom
          type="polygon"
          position="x*y"
          color={['value', '#BAE7FF-#1890FF-#0050B3']}
          shape="spline"
          style={{ lineWidth: 3, stroke: '#fff' }}
          size={2}
        />
      </Chart>
    </Card>
  )
}
