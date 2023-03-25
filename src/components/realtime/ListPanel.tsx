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
  topData: TopData
  listData: ListData
  page: number
  onChangePage: (value: number) => void
}

export default (props: Props) => {
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
      <div className={styles.topKey}>#1 {props.topData.key}</div>
      <div className={styles.topContainer}>
        <div className={styles.metric}>
          <div className={styles.value}>{formatInteger(props.topData.value)}</div>
          <div className={styles.percent}>{formatPercent(props.topData.percent)}</div>
        </div>
        <div className={styles.chart}>
          <BarChart data={props.topData.chart} size={6} />
        </div>
      </div>
      <div className={styles.listTitle}>
        <div>{props.dimensionName}</div>
        <div>{props.measureName}</div>
      </div>
      {props.listData.data.length > 0 ? (
        <React.Fragment>
          <div className={styles.listBody}>
            {props.listData.data.map((item) => {
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
            {(props.page - 1) * PAGE_SIZE + 1}-
            {Math.min(props.page * PAGE_SIZE, props.listData.total)}
            {' of '}
            {props.listData.total}{' '}
            <Button
              fill="none"
              className={styles.btn}
              disabled={props.page === 1}
              onClick={() => {
                props.onChangePage(props.page - 1)
              }}
            >
              <LeftOutline />
            </Button>{' '}
            <Button
              fill="none"
              className={styles.btn}
              disabled={props.page === Math.ceil(props.listData.total / PAGE_SIZE)}
              onClick={() => {
                props.onChangePage(props.page + 1)
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
