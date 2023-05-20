import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Chart, Interval, Axis, Coordinate, Legend, getTheme } from 'bizcharts'
import CountUp from 'react-countup'
import { formatPercent } from '~/src/common/utils'
import BarChart from './BarChart'
import * as service from '~/src/services/realtime-overview'
import { useInterval } from '~/src/common/utils'
import * as styles from './UserSummary.module.less'

export default () => {
  const [previousUserCount, setPreviousUserCount] = useState(0)
  const [data, setData] = useState<service.UserSummary>({
    userCount: 0,
    minutes: [],
    devices: [],
  })

  function refreshUserSummary() {
    service.getUserSummary().then((payload) => {
      setPreviousUserCount(data.userCount)
      setData(payload)
    })
  }

  useEffect(() => refreshUserSummary(), [])
  useInterval(() => refreshUserSummary(), 5000)

  return (
    <Card>
      <div className={styles.title}>USERS IN LAST 30 MINUTES</div>
      <CountUp
        className={styles.userCount}
        start={previousUserCount}
        end={data.userCount}
        duration={2.75}
        separator=","
      />
      <div className={styles.title} style={{ marginTop: '18px' }}>
        USER PER MINUTE
      </div>
      <div style={{ height: '80px' }}>
        <BarChart data={data.minutes} size={10} />
      </div>
      <div className={styles.title} style={{ marginTop: '18px' }}>
        DEVICE CATEGORY IN LAST 30 MINUTES
      </div>
      <Chart height={130} autoFit data={data.devices}>
        <Interval position="value" adjust="stack" color="key" tooltip={false} />
        <Coordinate type="theta" innerRadius={0.7} />
        <Axis visible={false} />
        <Legend visible={false} />
      </Chart>
      <div className={styles.legendList}>
        {data.devices.map((item, index) => {
          return (
            <div className={styles.legendItem} key={item.key}>
              <div className={styles.type}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: getTheme().colors10[index] }}
                />
                {item.key}
              </div>
              <div className={styles.value}>{formatPercent(item.value)}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
