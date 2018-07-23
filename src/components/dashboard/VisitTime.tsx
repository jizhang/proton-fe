import * as React from 'react'
import { Card } from 'antd-mobile'
import './VisitTime.less'

interface State {
  data: object[],
}

export default class VisitTime extends React.Component<any, State> {
  public readonly state: State = {
    data: [],
  }

  public componentDidMount() {
    fetch('/api/dashboard/activeHourlyUsers')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.payload.data,
        })
      })
  }

  public render() {
    return (
      <Card full={true} className="dashboard-visit-time">
      <Card.Header
        title="Users by time of day"
        extra={<span>1 week</span>}
      />
      <Card.Body>
        <div className="value-lg">140,000</div>
        <div className="chart-holder" />
      </Card.Body>
    </Card>
    )
  }
}
