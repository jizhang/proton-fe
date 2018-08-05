import * as React from 'react'
import TabItem from './TabItem'
import './Tabs.less'

export interface Tab {
  key: React.Key,
  element: React.ReactNode,
}

interface Props {
  tabs: Tab[],
  current: React.Key,
  onChange: (key: React.Key) => void,
}

export default class Tabs extends React.Component<Props> {
  public render() {
    return (
      <div className="dashboard-tabs">
        {this.props.tabs.map(tab => (
          <TabItem
            tab={tab}
            key={tab.key}
            active={this.props.current === tab.key}
            onClick={this.props.onChange}
          />
        ))}
      </div>
    )
  }
}
