import React from 'react'
import _ from 'lodash'
import ListPanel from './ListPanel'

export default () => {
  const chartData = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))

  const listData = [
    { key: 'google', value: 1777, percent: 0.9052 },
    { key: '(direct)', value: 173, percent: 0.0881 },
    { key: 'pbb.lviv.ua', value: 13, percent: 0.0066 },
  ]

  return (
    <ListPanel
      measureName="Users"
      dimensionName="First user source"
      chartData={chartData}
      listData={listData}
    />
  )
}
