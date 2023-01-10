import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import { Card } from 'antd-mobile'
import { Chart, Geom } from 'bizcharts'
import CountUp from 'react-countup'
import { RootStoreContext } from '~/src/stores'
import * as styles from './Realtime.module.less'

export default observer(() => {
  let activeUserHandler: number

  useEffect(() => {
    getActiveUser()
    activeUserHandler = window.setInterval(() => {
      getActiveUser()
    }, 5000)

    return () => {
      window.clearInterval(activeUserHandler)
    }
  }, [])

  const { dashboardStore } = useContext(RootStoreContext)

  function getActiveUser() {
    dashboardStore.fetchActiveUser()
  }

  const { realtime } = dashboardStore
  const data = _.map(realtime.minutes, (value, index) => {
    return { x: index, y: value }
  })

  return (
    <Card title="Real time" extra="Last 5 minutes" style={{ borderRadius: 0 }}>
      <CountUp
        className={styles.value}
        start={realtime.previousCount}
        end={realtime.count}
        duration={2.75}
        separator=","
      />
      <div className={styles.title}>Unique views per minute</div>
      <Chart autoFit height={100} data={data} padding={[0, 8, 0, 8]}>
        <Geom type="interval" position="x*y" size={8} />
      </Chart>
    </Card>
  )
})
