import * as React from 'react'
import './Tabs.less'

interface Props {
  tabs: Array<{
    key: React.Key,
    element: React.ReactElement<any>,
  }>,
  current: React.Key,
  onChange: (key: React.Key) => void,
}

export default class Tabs extends React.Component<Props> {
  public render() {
    return (
      <div className="dashboard-tabs">
        {this.props.tabs.map(tab => (
          <div
            className={`tab-item ${this.props.current === tab.key ? 'active' : ''}`}
            key={tab.key}
            onClick={() => this.props.onChange(tab.key)}
          >
            <div className="bar" />
            {tab.element}
          </div>
        ))}
      </div>
    )
  }
}
