import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Axis, Legend } from 'bizcharts'
import { getActiveHourlyUsers } from '~/src/services/dashboard'
import './VisitTime.less'

export default () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getActiveHourlyUsers().then((payload) => {
      setData(payload)
    })
  }, [])

  const scale = {
    hour: {
      type: 'cat',
      values: [
        '11pm',
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
        '12pm',
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
        '12am',
      ],
    },
    day: {
      type: 'cat',
      values: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    <Card
      className="dashboard-visit-time"
      title="Users by time of day"
      extra={<span>1 week</span>}
      style={{ borderRadius: 0 }}
    >
      <Chart data={data} height={450} padding={[0, 45, 50, 0]} scale={scale} autoFit>
        <Axis
          name="hour"
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
        <Axis name="day" tickLine={{ length: 0 }} />
        <Legend slidable={false} itemFormatter={legendItemFormatter} />
        <Geom
          type="polygon"
          position="day*hour"
          color={['users', '#BAE7FF-#1890FF-#0050B3']}
          shape="spline"
          style={{ lineWidth: 3, stroke: '#fff' }}
          size={2}
        />
      </Chart>
    </Card>
  )
}
