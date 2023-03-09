import React from 'react'
import _ from 'lodash'
import { Chart, Interval, Axis, getTheme } from 'bizcharts'

interface Props {
  data: number[]
  size: number
}

export default (props: Props) => {
  const chartData = _.map(props.data, (y, x) => ({ x, y }))
  return (
    <React.Fragment>
      {chartData.length > 0 ? (
        <Chart
          autoFit
          data={chartData}
          scale={{
            x: {
              type: 'cat',
            },
          }}
        >
          <Interval position="x*y" size={props.size} tooltip={false} />
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
      ) : (
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No data available
        </div>
      )}
    </React.Fragment>
  )
}
