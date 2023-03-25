import React, { useEffect, useState } from 'react'
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
    service.getViewsByPageTitleTop().then((payload) => {
      setTopData(payload)
    })
  }, [])

  const [page, setPage] = useState(1)
  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

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
      listData={listData}
      page={page}
      onChangePage={setPage}
    />
  )
}
