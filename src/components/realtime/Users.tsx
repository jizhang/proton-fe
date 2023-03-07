import React from 'react'
import _ from 'lodash'
import { Card } from 'antd-mobile'
import { Chart, Interval, Axis, Coordinate, Legend, getTheme } from 'bizcharts'
import CountUp from 'react-countup'
import { formatPercent } from '~/src/common/utils'
import * as styles from './Users.module.less'

export default () => {
  const data = _.times(30, (x) => {
    return { x, y: _.random(1000, 2000) * _.random(0, 5) }
  })

  const deviceData = [
    { type: 'DESKTOP', value: 0.7365 },
    { type: 'MOBILE', value: 0.1923 },
    { type: 'OTHER', value: 0.0712 },
  ]

  return (
    <Card>
      <div className={styles.title}>USERS IN LAST 30 MINUTES</div>
      <CountUp className={styles.userCount} start={1000} end={2000} duration={2.75} separator="," />
      <div className={styles.title} style={{ marginTop: '18px' }}>
        USER PER MINUTE
      </div>
      <Chart
        height={80}
        autoFit
        data={data}
        scale={{
          x: {
            type: 'cat',
          },
        }}
      >
        <Interval position="x*y" size={10} tooltip={false} />
        <Axis
          name="x"
          label={null}
          line={{
            style: {
              stroke: getTheme().colors10[0],
            },
          }}
        />
        <Axis name="y" visible={false} />
      </Chart>
      <div className={styles.title} style={{ marginTop: '18px' }}>
        DEVICE CATEGORY IN LAST 30 MINUTES
      </div>
      <Chart height={130} autoFit data={deviceData}>
        <Interval position="value" adjust="stack" color="type" tooltip={false} />
        <Coordinate type="theta" innerRadius={0.7} />
        <Axis visible={false} />
        <Legend visible={false} />
      </Chart>
      <div className={styles.legendList}>
        {deviceData.map((item, index) => {
          return (
            <div className={styles.legendItem} key={item.type}>
              <div className={styles.type}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: getTheme().colors10[index] }}
                ></span>
                {item.type}
              </div>
              <div className={styles.value}>{formatPercent(item.value)}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
