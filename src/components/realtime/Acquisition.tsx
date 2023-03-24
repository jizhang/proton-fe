import React, { useState, useEffect } from 'react'
import * as service from '~/src/services/realtime-overview'
import ListPanel from './ListPanel'

export default () => {
  const [dimensionName, setDimensionName] = useState('First user source')
  const [topData, setTopData] = useState<service.TopData>({
    key: '-',
    value: 0,
    percent: 0,
    chart: [],
  })

  useEffect(() => {
    service.getUserAcquisitionTop(dimensionName).then((payload) => {
      setTopData(payload)
    })
  }, [dimensionName])

  const [page, setPage] = useState(1)
  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    service.getUserAcquisitionList(dimensionName, page).then((payload) => {
      setListData(payload)
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
