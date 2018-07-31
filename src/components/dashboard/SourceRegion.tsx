import * as React from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom } from 'bizcharts'
import DataSet from '@antv/data-set'
import * as _ from 'lodash'
import './SourceRegion.less'

interface State {
  geoData: object,
  chartHeight: number,
}

export default class SourceRegion extends React.Component<any, State> {
  public readonly state: State = {
    geoData: {},
    chartHeight: 256,
  }

  public componentDidMount() {
    this.requestData()
    this.calculateHeight()
  }

  private requestData() {
    let requests: Array<Promise<any>> = [
      fetch('/api/dashboard/geoChina'),
      fetch('/api/dashboard/userGeo'),
    ]

    requests = _.map(requests, request => {
      return request
        .then(response => response.json())
        .then(responseJSON => responseJSON.payload)
    })

    Promise.all(requests).then(payloads => {
      let geoData = this.processData(payloads[0], payloads[1].province)
      this.setState({ geoData })
    })
  }

  private calculateHeight() {
    let chartHeight = _.round((document.documentElement.clientWidth - 30) / 4 * 3)
    this.setState({
      chartHeight,
    })
  }

  private processData(geoChina: any[], userGeo: any) {
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

    return dvData
  }

  public render() {
    return (
      <Card full={true} className="dashboard-source-region">
        <Card.Header
          title="Users by location"
          extra={<span>1 day</span>}
        />
        <Card.Body>
          <Chart
            forceFit={true}
            height={this.state.chartHeight}
            padding={[-40, -25, -120, -15]}
            data={this.state.geoData}
          >
            <Geom
              type="polygon"
              position="longitude*latitude"
              style={{ stroke: '#fff', lineWidth: 1 }}
              color={['value', '#BAE7FF-#1890FF-#0050B3']}
            />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
