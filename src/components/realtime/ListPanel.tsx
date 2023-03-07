import React from 'react'
import _ from 'lodash'
import { Card } from 'antd-mobile'
import { LeftOutline, RightOutline } from 'antd-mobile-icons'
import { Chart, Interval, Axis, getTheme } from 'bizcharts'
import * as styles from './ListPanel.module.less'

export default () => {
  const data = _.times(30, (x) => {
    return { x, y: _.random(1000, 2000) * _.random(0, 5) }
  })

  const listData = [
    { key: 'google', value: 1777, percent: 0.9052 },
    { key: '(direct)', value: 173, percent: 0.0881 },
    { key: 'pbb.lviv.ua', value: 13, percent: 0.0066 },
  ]

  return (
    <Card>
      <div className={styles.title}>Users by First user source</div>
      <div className={styles.topKey}>#1 google</div>
      <div className={styles.topContainer}>
        <div className={styles.metric}>
          <div className={styles.value}>1,777</div>
          <div className={styles.percent}>90.5%</div>
        </div>
        <div className={styles.chart}>
          <Chart
            autoFit
            data={data}
            scale={{
              x: {
                type: 'cat',
              },
            }}
          >
            <Interval position="x*y" size={6} tooltip={false} />
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
        </div>
      </div>
      <div className={styles.listTitle}>
        <div>FIRST USER SOURE</div>
        <div>USERS</div>
      </div>
      <div className={styles.listBody}>
        {listData.map((item) => {
          return (
            <div key={item.key} className={styles.listItem}>
              <div className={styles.metric}>
                <div className={styles.key}>{item.key}</div>
                <div className={styles.value}>{item.value}</div>
              </div>
              <div
                className={styles.percent}
                style={{
                  width: item.percent * 100 + '%',
                  backgroundColor: getTheme().colors10[0],
                }}
              ></div>
            </div>
          )
        })}
      </div>
      <div className={styles.pagination}>
        1-3 of 3 <LeftOutline /> <RightOutline />
      </div>
    </Card>
  )
}
