import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Chart, Coord, Geom } from 'bizcharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMobileScreenButton,
  faTabletScreenButton,
  faDesktop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { getUserDevice } from '~/src/services/dashboard'
import * as styles from './UserDevice.module.less'

export default () => {
  const [devices, setDevices] = useState<any[]>([])

  useEffect(() => {
    getUserDevice().then((payload) => {
      const { devices } = payload
      if (!_.isEmpty(devices)) {
        setDevices(transformData(devices))
      }
    })
  }, [])

  function transformData(devices: any[]) {
    const totals = _(['current', 'previous'])
      .map((key) => [key, _(devices).map(key).sum()])
      .fromPairs()
      .value()

    return _.map(devices, (row) => {
      _.forEach(['current', 'previous'], (key) => {
        row[`${key}_percent`] = row[key] / totals[key]
      })
      row.percent = formatPercent(row.current_percent, row.previous_percent)
      return row
    })
  }

  function formatPercent(current: number, previous: number) {
    const percent = _.round(((current - previous) / previous) * 100, 1)
    let formatted: string
    let color: string
    if (percent > 0) {
      formatted = '↑' + percent + '%'
      color = 'up'
    } else if (percent < 0) {
      formatted = '↓' + -percent + '%'
      color = 'down'
    } else {
      formatted = '0.0%'
      color = ''
    }
    return { formatted, color }
  }

  function formatPercentValue(value: number) {
    return _.round(value * 100, 1) + '%'
  }

  const iconMapping: Record<string, IconDefinition> = {
    iphone: faMobileScreenButton,
    ipad: faTabletScreenButton,
  }

  function getIcon(name: string) {
    return _.get(iconMapping, name, faDesktop)
  }

  return (
    <Card title="Users by device" extra="1 day" style={{ borderRadius: 0 }}>
      <Chart autoFit height={240} data={devices} padding={[-25, 0, -10, 0]}>
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Geom
          type="interval"
          adjust="stack"
          position="current"
          color="name"
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        />
      </Chart>
      <div className={styles.deviceList}>
        {devices.map((device) => (
          <div className={styles.deviceItem} key={device.name}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={getIcon(device.name)} />
            </div>
            <div className={styles.label}>{device.name}</div>
            <div className={styles.value}>{formatPercentValue(device.current_percent)}</div>
            <div className={`${styles.percent} ${styles[device.percent.color]}`}>
              {device.percent.formatted}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
