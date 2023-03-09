import React from 'react'
import { Card } from 'antd-mobile'
import { LeftOutline, RightOutline } from 'antd-mobile-icons'
import { getTheme } from 'bizcharts'
import { formatInteger, formatPercent } from '~/src/common/utils'
import BarChart from './BarChart'
import * as styles from './ListPanel.module.less'

interface Props {
  measureName: string
  dimensionName: string
  chartData: number[]
  listData: {
    key: string
    value: number
    percent: number
  }[]
}

export default (props: Props) => {
  const topData =
    props.listData.length > 0
      ? props.listData[0]
      : {
          key: '-',
          value: 0,
          percent: 0,
        }

  return (
    <Card>
      <div className={styles.title}>
        {props.measureName} by {props.dimensionName}
      </div>
      <div className={styles.topKey}>#1 {topData.key}</div>
      <div className={styles.topContainer}>
        <div className={styles.metric}>
          <div className={styles.value}>{formatInteger(topData.value)}</div>
          <div className={styles.percent}>{formatPercent(topData.percent)}</div>
        </div>
        <div className={styles.chart}>
          <BarChart data={props.chartData} size={6} />
        </div>
      </div>
      <div className={styles.listTitle}>
        <div>{props.dimensionName}</div>
        <div>{props.measureName}</div>
      </div>
      {props.listData.length > 0 ? (
        <React.Fragment>
          <div className={styles.listBody}>
            {props.listData.map((item) => {
              return (
                <div key={item.key} className={styles.listItem}>
                  <div className={styles.metric}>
                    <div className={styles.key}>{item.key}</div>
                    <div className={styles.value}>{formatInteger(item.value)}</div>
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
            1-{props.listData.length} of {props.listData.length} <LeftOutline /> <RightOutline />
          </div>
        </React.Fragment>
      ) : (
        <div className={styles.listNoData}>No data available</div>
      )}
    </Card>
  )
}
