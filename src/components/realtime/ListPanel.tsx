import React, { useState } from 'react'
import { Card, Button, Picker } from 'antd-mobile'
import { LeftOutline, RightOutline, DownFill } from 'antd-mobile-icons'
import { getTheme } from 'bizcharts'
import type { TopData, ListData } from '~/src/services/realtime-overview'
import { formatInteger, formatPercent } from '~/src/common/utils'
import BarChart from './BarChart'
import * as styles from './ListPanel.module.less'

const PAGE_SIZE = 6

interface Props {
  measureName: string
  measureOptions?: string[]
  onChangeMeasureName?: (value: string) => void
  dimensionName: string
  dimensionOptions?: string[]
  onChangeDimensionName?: (value: string) => void
  chartData?: number[]
  listData?: {
    key: string
    value: number
    percent: number
  }[]
  topData?: TopData
  listDataV2?: ListData
  page?: number
  onChangePage?: (value: number) => void
}

export default (props: Props) => {
  let topData: TopData
  let listData: ListData

  if (props.topData && props.listDataV2) {
    topData = props.topData
    listData = props.listDataV2
  } else if (props.listData && props.listData.length > 0) {
    topData = {
      key: props.listData[0].key,
      value: props.listData[0].value,
      percent: props.listData[0].percent,
      chart: props.chartData || [],
    }
    listData = {
      data: props.listData,
      total: props.listData.length,
    }
  } else {
    topData = {
      key: '-',
      value: 0,
      percent: 0,
      chart: [],
    }
    listData = {
      data: [],
      total: 0,
    }
  }

  const page = props.page || 1

  const [measurePickerVisible, showMeasurePicker] = useState(false)
  const [dimensionPickerVisible, showDimensionPicker] = useState(false)

  return (
    <Card>
      <div className={styles.title}>
        {props.measureOptions && props.measureOptions.length > 0 ? (
          <Button
            fill="none"
            className={styles.btn}
            onClick={() => {
              showMeasurePicker(true)
            }}
          >
            {props.measureName} <DownFill className={styles.icon} />
          </Button>
        ) : (
          props.measureName
        )}
        {' by '}
        {props.dimensionOptions && props.dimensionOptions.length > 0 ? (
          <Button
            fill="none"
            className={styles.btn}
            onClick={() => {
              showDimensionPicker(true)
            }}
          >
            {props.dimensionName} <DownFill className={styles.icon} />
          </Button>
        ) : (
          props.dimensionName
        )}
      </div>
      <div className={styles.topKey}>#1 {topData.key}</div>
      <div className={styles.topContainer}>
        <div className={styles.metric}>
          <div className={styles.value}>{formatInteger(topData.value)}</div>
          <div className={styles.percent}>{formatPercent(topData.percent)}</div>
        </div>
        <div className={styles.chart}>
          <BarChart data={topData.chart} size={6} />
        </div>
      </div>
      <div className={styles.listTitle}>
        <div>{props.dimensionName}</div>
        <div>{props.measureName}</div>
      </div>
      {listData.data.length > 0 ? (
        <React.Fragment>
          <div className={styles.listBody}>
            {listData.data.map((item) => {
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
            {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, listData.total)}
            {' of '}
            {listData.total}{' '}
            <Button
              fill="none"
              className={styles.btn}
              disabled={page === 1}
              onClick={() => {
                if (props.onChangePage) {
                  props.onChangePage(page - 1)
                }
              }}
            >
              <LeftOutline />
            </Button>{' '}
            <Button
              fill="none"
              className={styles.btn}
              disabled={page === Math.ceil(listData.total / PAGE_SIZE)}
              onClick={() => {
                if (props.onChangePage) {
                  props.onChangePage(page + 1)
                }
              }}
            >
              <RightOutline />
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <div className={styles.listNoData}>No data available</div>
      )}
      {props.measureOptions && props.measureOptions.length > 0 && (
        <Picker
          columns={[props.measureOptions]}
          visible={measurePickerVisible}
          onClose={() => {
            showMeasurePicker(false)
          }}
          value={[props.measureName]}
          onConfirm={(value) => {
            if (props.onChangeMeasureName) {
              props.onChangeMeasureName(value[0] as string)
            }
          }}
        />
      )}
      {props.dimensionOptions && props.dimensionOptions.length > 0 && (
        <Picker
          columns={[props.dimensionOptions]}
          visible={dimensionPickerVisible}
          onClose={() => {
            showDimensionPicker(false)
          }}
          value={[props.dimensionName]}
          onConfirm={(value) => {
            if (props.onChangeDimensionName) {
              props.onChangeDimensionName(value[0] as string)
            }
          }}
        />
      )}
    </Card>
  )
}
