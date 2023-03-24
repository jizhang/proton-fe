import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import * as service from '~/src/services/realtime-overview'
import ListPanel from './ListPanel'

export default () => {
  const sampleData = [
    { key: 'google', value: 1777, percent: 0.9052 },
    { key: '(direct)', value: 173, percent: 0.0881 },
    { key: 'pbb.lviv.ua', value: 13, percent: 0.0066 },
  ]

  const [dimensionName, setDimensionName] = useState('First user source')
  const [topData, setTopData] = useState<service.TopData>({
    key: '-',
    value: 0,
    percent: 0,
    chart: [],
  })

  useEffect(() => {
    setTopData(
      _.assign(_.clone(sampleData[0]), {
        chart: _.times(30, () => _.random(1000, 2000) * _.random(0, 5)),
      })
    )
  }, [dimensionName])

  const [page, setPage] = useState(1)
  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    setListData({
      data: sampleData,
      total: sampleData.length,
    })
  }, [dimensionName, page])

  return (
    <ListPanel
      measureName="Users"
      dimensionName={dimensionName}
      dimensionOptions={['First user source', 'First user medium', 'First user source / medium']}
      onChangeDimensionName={setDimensionName}
      topData={topData}
      listDataV2={listData}
      page={page}
      onChangePage={setPage}
    />
  )
}
