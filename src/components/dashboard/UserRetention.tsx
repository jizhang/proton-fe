import * as React from 'react'
import { Card } from 'antd-mobile'
import './UserRetention.less'

interface State {
  data: any[],
}

export default class UserRention extends React.Component<any, State> {
  public readonly state: State = {
    data: [],
  }

  public componentDidMount() {
    fetch('/api/dashboard/userRetention')
      .then(response => response.json())
      .then(responseJson => {
        let { retention } = responseJson.payload
      })
  }

  public render() {
    return (
      <Card full={true} className="dashboard-user-retention">
        <Card.Header
          title="User retention"
          extra="6 weeks"
        />
        <Card.Body>
          body
        </Card.Body>
      </Card>
    )
  }
}
