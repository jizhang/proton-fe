import * as React from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Coord, Axis } from 'bizcharts'
import DataSet from '@antv/data-set'
import * as _ from 'lodash'
import './SourceRegion.less'

interface State {
  geoData: object,
  chartHeight: number,
  barData: object[],
}

export default class SourceRegion extends React.Component<any, State> {
  public readonly state: State = {
    geoData: {},
    chartHeight: 256,
    barData: [],
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
      let geoChina = payloads[0]
      let { province } = payloads[1]
      let geoData = this.processData(geoChina, province)
      let barData = this.processBarData(province)
      this.setState({
        geoData,
        barData,
      })
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

  private processBarData(province: any[]) {
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

          <Chart
            height={240}
            forceFit={true}
            data={this.state.barData}
            padding={['auto', 'auto']}
            style={{
              marginTop: 10,
            }}
          >
            <Coord transpose={true} />
            <Axis
              name="province"
              label={{
                offset: 12,
                textStyle: {
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
                textStyle: {
                  fill: '#888',
                },
              }}
            />
            <Geom
              type="interval"
              position="province*percent"
            />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
