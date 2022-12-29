import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Coord, Axis } from 'bizcharts'
import DataSet from '@antv/data-set'
import _ from 'lodash'
import * as request from '../../services/request'
import './SourceRegion.less'

export default () => {
  const [geoData, setGeoData] = useState<any[]>([])
  const [chartHeight, setChartHeight] = useState(256)
  const [barData, setBarData] = useState<any[]>([])

  useEffect(() => {
    requestData()
    calculateHeight()
  }, [])

  function requestData() {
    let requests = [
      request.get('/api/dashboard/geoChina'),
      request.get('/api/dashboard/userGeo'),
    ]

    Promise.all(requests).then(payloads => {
      let geoChina = payloads[0]
      let { province } = payloads[1]
      setGeoData(processData(geoChina, province))
      setBarData(processBarData(province))
    })
  }

  function calculateHeight() {
    setChartHeight(_.round((document.documentElement.clientWidth - 30) / 4 * 3))
  }

  function processData(geoChina: any[], userGeo: any) {
    let mapData = {
      type: 'FeatureCollection',
      features: geoChina,
    }

    let ds = new DataSet()
    let geoDataView = ds.createView().source(mapData, {
      type: 'GeoJSON',
    })

    let dvData = ds.createView().source(userGeo)
    dvData.transform({
      type: 'geo.region',
      field: 'name',
      geoDataView,
      as: ['longitude', 'latitude'],
    })

    return dvData.rows
  }

  function processBarData(province: any[]) {
    let total = _(province).map('value').sum()
    return _(province)
      .orderBy(['value'], ['desc'])
      .take(5)
      .map(item => {
        return {
          province: item.name,
          percent: _.round(item.value / total, 4),
        }
      })
      .reverse()
      .value()
  }

  return (
    <Card
      className="dashboard-source-region"
      title="Users by location"
      extra={<span>1 day</span>}
      style={{ borderRadius: 0 }}
    >
      <Chart
        autoFit
        height={chartHeight}
        padding={[0, 0, -80, 0]}
        data={geoData}
        pure
      >
        <Geom
          type="polygon"
          position="longitude*latitude"
          style={{ stroke: '#fff', lineWidth: 1 }}
          color={['value', '#BAE7FF-#1890FF-#0050B3']}
        />
      </Chart>

      <Chart
        height={240}
        autoFit
        data={barData}
        padding="auto"
        style={{
          marginTop: 10,
        }}
      >
        <Coord transpose={true} />
        <Axis
          name="province"
          label={{
            offset: 12,
            style: {
              fill: '#888',
            },
          }}
        />
        <Axis
          name="percent"
          label={{
            formatter: (text: string) => {
              return Number(text) * 100 + '%'
            },
            style: {
              fill: '#888',
            },
          }}
        />
        <Geom
          type="interval"
          position="province*percent"
        />
      </Chart>
    </Card>
  )
}
