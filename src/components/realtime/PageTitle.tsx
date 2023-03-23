import React, { useEffect, useState } from 'react'
import * as service from '~/src/services/realtime-overview'
import ListPanel from './ListPanel'

export default () => {
  const [page, setPage] = useState(1)

  const [topData, setTopData] = useState<service.TopData>({
    key: '-',
    value: 0,
    percent: 0,
    chart: [],
  })

  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    service.getViewsByPageTitleTop().then((payload) => {
      setTopData(payload)
    })
  }, [])

  useEffect(() => {
    service.getViewsByPageTitleList(page).then((payload) => {
      setListData(payload)
    })
  }, [page])

  return (
    <ListPanel
      measureName="Views"
      dimensionName="Page title"
      topData={topData}
      listDataV2={listData}
      page={page}
      onChangePage={setPage}
    />
  )
}
