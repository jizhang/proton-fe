import React, { useState, useEffect } from 'react'
import * as service from '~/src/services/realtime-overview'
import ListPanel from './ListPanel'

export default () => {
  const [measureName, setMeasureName] = useState('Users')
  const [topData, setTopData] = useState<service.TopData>({
    key: '-',
    value: 0,
    percent: 0,
    chart: [],
  })

  useEffect(() => {
    service.getAudienceTop(measureName).then(setTopData)
  }, [measureName])

  const [page, setPage] = useState(1)
  const [listData, setListData] = useState<service.ListData>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    service.getAudienceList(measureName, page).then(setListData)
  }, [measureName, page])

  return (
    <ListPanel
      measureName={measureName}
      measureOptions={['Users', 'New users']}
      onChangeMeasureName={setMeasureName}
      dimensionName="Audience"
      topData={topData}
      listDataV2={listData}
      page={page}
      onChangePage={setPage}
    />
  )
}
