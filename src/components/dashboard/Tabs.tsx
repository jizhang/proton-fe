import React from 'react'
import TabItem from './TabItem'
import './Tabs.less'

export interface Tab {
  key: string
  element: React.ReactNode
}

interface Props {
  tabs: Tab[]
  current: string
  onChange: (key: string) => void
}

export default (props: Props) => {
  return (
    <div className="dashboard-tabs">
      {props.tabs.map((tab) => (
        <TabItem
          tab={tab}
          key={tab.key}
          active={props.current === tab.key}
          onClick={props.onChange}
        />
      ))}
    </div>
  )
}
