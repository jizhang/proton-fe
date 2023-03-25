import React, { useState, useEffect } from 'react'
import * as service from '~/src/services/realtime-overview'
import ListPanel from './ListPanel'

export default () => {
  const [topData, setTopData] = useState<service.TopData>({
    key: '-',
    value: 0,
    percent: 0,
    chart: [],
  })

  useEffect(() => {
    service.getUserPropertyTop().then(setTopData)
  }, [])

  const [page, setPage] = useState(1)
  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    service.getUserPropertyList(page).then(setListData)
  }, [page])

  return (
    <ListPanel
      measureName="Users"
      dimensionName="User property"
      topData={topData}
      listDataV2={listData}
      page={page}
      onChangePage={setPage}
    />
  )
}
