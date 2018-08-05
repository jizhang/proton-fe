import * as React from 'react'
import { Tab } from './Tabs'

interface Props {
  tab: Tab,
  active: boolean,
  onClick: (key: React.Key) => void,
}

export default class TabItem extends React.Component<Props> {
  private handleClick = () => {
    this.props.onClick(this.props.tab.key)
  }

  public render() {
    let { tab, active } = this.props
    return (
      <div
        className={`tab-item ${active ? 'active' : ''}`}
        key={tab.key}
        onClick={this.handleClick}
      >
        <div className="bar" />
        {tab.element}
      </div>
    )
  }
}
