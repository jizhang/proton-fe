import React from 'react'
import _ from 'lodash'
import ListPanel from './ListPanel'

export default () => {
  const chartData = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))

  const listData = [
    { key: 'RESTful API Authentication with Spring Security', value: 1512, percent: 0.3883 },
    { key: 'Configure Git Line Endings Across OSes', value: 1054, percent: 0.2707 },
    { key: 'Setup CI with GitHub Actions (Java/Node/Python)', value: 772, percent: 0.1983 },
    { key: 'Mock API in Parcel Project', value: 274, percent: 0.0704 },
    { key: 'Configure Logging for Flask SQLAlchemy Project', value: 154, percent: 0.0395 },
    { key: 'Use Composition API and Pinia in Vue 2 Project', value: 100, percent: 0.0257 },
    { key: 'Add TypeScript Support to Vue 2 Project', value: 20, percent: 0.0051 },
    { key: 'Manage Multiple CommandLineRunner in Spring Boot', value: 8, percent: 0.0021 },
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
