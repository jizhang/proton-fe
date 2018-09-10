import * as React from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Axis, Legend } from 'bizcharts'
import { AxisLabel } from '@antv/g2/src'
import * as request from '../../services/request'
import './VisitTime.less'

interface State {
  data: object[],
}

export default class VisitTime extends React.Component<any, State> {
  public readonly state: State = {
    data: [],
  }

  public componentDidMount() {
    request.get('/api/dashboard/activeHourlyUsers').then(payload => {
      this.setState({
        data: payload,
      })
    })
  }

  public render() {
    let scale = {
      hour: {
        type: 'cat',
        values: [
          '11pm', '10pm', '9pm', '8pm', '7pm', '6pm', '5pm', '4pm', '3pm', '2pm', '1pm', '12pm',
          '11am', '10am', '9am', '8am', '7am', '6am', '5am', '4am', '3am', '2am', '1am', '12am',
        ],
      },
      day: {
        type: 'cat',
        values: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    }

    let label: AxisLabel = {
      textStyle: {
        textAlign: 'right',
      },
      offset: 45,
      formatter(text, item, index) {
        return (index % 2 === 0) ? '' : text
      },
    }

    let legendItemFormatter = (item: number): string | number => {
      if (Math.abs(item) >= 1000) {
        const itemK = Math.round(item / 1000);
        return `${itemK}k`;
      }
      return item;
    }

    return (
      <Card full={true} className="dashboard-visit-time">
        <Card.Header
          title="Users by time of day"
          extra={<span>1 week</span>}
        />
        <Card.Body>
          <Chart
            data={this.state.data}
            height={450}
            padding={[0, 45, 90, 0]}
            scale={scale}
            forceFit={true}
          >
            <Axis
              name="hour"
              position="right"
              label={label}
            />
            <Axis
              name="day"
              tickLine={{ length: 0 }}
            />
            <Legend
              slidable={false}
              offsetY={-30}
              itemFormatter={legendItemFormatter}
            />
            <Geom
              type="polygon"
              position="day*hour"
              color={['users', '#BAE7FF-#1890FF-#0050B3']}
              shape="spline"
              style={{ lineWidth: 3, stroke: '#fff' }}
              size={2}
            />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
