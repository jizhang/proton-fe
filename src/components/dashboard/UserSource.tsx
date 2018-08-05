import * as React from 'react'
import * as _ from 'lodash'
import Tabs from './Tabs'
import './UserSource.less'

interface State {
  tabs: Array<{ key: string, element: JSX.Element }>,
  current: string,
}

export default class UserSource extends React.Component<any, State> {
  public readonly state: State = {
    tabs: [],
    current: '',
  }

  public componentDidMount() {
    let tabs = _.times(10, i => {
      return {
        key: `tab${i}`,
        element: <>tab{i}</>,
      }
    })
    let current = tabs[0].key
    this.setState({ tabs, current })
  }

  private handleChangeTab = (key: string) => {
    this.setState({ current: key })
  }

  public render() {
    return (
      <div className="dashboard-user-source">
        <Tabs
          tabs={this.state.tabs}
          current={this.state.current}
          onChange={this.handleChangeTab}
        />
        <div style={{ padding: 15 }}>
          <div style={{ height: 240, backgroundColor: '#ddd' }} />
        </div>
      </div>
    )
  }
}
