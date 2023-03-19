import React from 'react'
import _ from 'lodash'
import ListPanel from './ListPanel'

export default () => {
  const chartData = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))

  const listData = [
    { key: 'page_view', value: 7844, percent: 0.2574 },
    { key: 'session_start', value: 7727, percent: 0.2535 },
    { key: 'user_engagement', value: 5914, percent: 0.1941 },
    { key: 'first_visit', value: 4231, percent: 0.1388 },
    { key: 'click', value: 2675, percent: 0.0878 },
    { key: 'scroll', value: 2086, percent: 0.0684 },
  ]

  return (
    <ListPanel
      measureName="Event count"
      dimensionName="Event name"
      chartData={chartData}
      listData={listData}
    />
  )
}
