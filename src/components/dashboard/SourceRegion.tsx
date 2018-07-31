import * as React from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom } from 'bizcharts'
import DataSet from '@antv/data-set'
import * as _ from 'lodash'
import geoChina from '../../assets/geo-china.json'
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
    let geoData = this.processData(geoChina)
    let chartHeight = _.round((document.documentElement.clientWidth - 30) / 4 * 3)
    this.setState({
      geoData,
      chartHeight,
    })
  }

  private processData(geoJSON: any[]) {
    let mapData = {
      type: 'FeatureCollection',
      features: geoJSON,
    }

    let userData = []
    for (let item of geoJSON) {
      let name = item.properties.name
      userData.push({
        name,
        value: Math.round(Math.random() * 1000),
      })
    }

    let ds = new DataSet()
    let geoDataView = ds.createView().source(mapData, {
      type: 'GeoJSON',
    })

    let dvData = ds.createView().source(userData)
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
