import React from 'react'
import _ from 'lodash'
import ListPanel from './ListPanel'

export default () => {
  const chartData = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))

  const listData = [
    { key: 'RESTful API Authentication with Spring Security', value: 1512, percent: 0.4186 },
    { key: 'Configure Git Line Endings Across OSes', value: 1054, percent: 0.2918 },
    { key: 'Setup CI with GitHub Actions (Java/Node/Python)', value: 772, percent: 0.2137 },
    { key: 'Mock API in Parcel Project', value: 274, percent: 0.0759 },
  ]

  return (
    <ListPanel
      measureName="Views"
      dimensionName="Page title"
      chartData={chartData}
      listData={listData}
    />
  )
}
