import React from 'react'
import ListPanel from './ListPanel'

export default () => {
  const chartData = []
  const listData = []

  return (
    <ListPanel
      measureName="Conversions"
      dimensionName="Event name"
      chartData={chartData}
      listData={listData}
    />
  )
}
