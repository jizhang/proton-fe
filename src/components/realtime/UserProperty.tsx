import React from 'react'
import ListPanel from './ListPanel'

export default () => {
  const chartData = []
  const listData = []

  return (
    <ListPanel
      measureName="Users"
      dimensionName="User property"
      chartData={chartData}
      listData={listData}
    />
  )
}
