import * as React from 'react'
import { Card } from 'antd-mobile'
import { Chart, Geom, Axis, Legend } from 'bizcharts'
import { formatNumber } from '../../services/util'

interface State {
  count: number,
}

export default class Realtime extends React.Component<any, State> {
  public readonly state: State = {
    count: 0,
  }

  private activeUserHandler: number

  public componentDidMount() {
    this.getActiveUser()
    this.activeUserHandler = window.setInterval(() => {
      this.getActiveUser()
    }, 3000)
  }

  public componentWillUnmount() {
    if (this.activeUserHandler) {
      window.clearInterval(this.activeUserHandler)
    }
  }

  private getActiveUser = () => {
    fetch('/api/dashboard/activeUser')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          count: responseJson.payload.count
        })
      })
  }

  public render() {
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 }
    ]

    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' }
    }

    return (
      <Card full={true}>
        <Card.Header
          title="Real time"
          extra="Last 5 minutes"
        />
        <Card.Body>
          <div className="value-lg">{formatNumber(this.state.count)}</div>
          <Chart forceFit={true} height={280} data={data} scale={cols}>
            <Axis name="genre" />
            <Axis name="sold" />
            <Legend />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>
        </Card.Body>
      </Card>
    )
  }
}
