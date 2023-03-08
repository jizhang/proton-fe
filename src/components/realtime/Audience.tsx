import React from 'react'
import _ from 'lodash'
import ListPanel from './ListPanel'

export default () => {
  const chartData = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))

  const listData = [
    { key: 'All Users', value: 1166, percent: 0.8643 },
    { key: 'Purchasers', value: 183, percent: 0.1357 },
  ]

  return (
    <ListPanel
      measureName="Users"
      dimensionName="Audience"
      chartData={chartData}
      listData={listData}
    />
  )
}
