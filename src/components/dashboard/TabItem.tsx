import React from 'react'
import { Tab } from './Tabs'

interface Props {
  tab: Tab,
  active: boolean,
  onClick: (key: string) => void,
}

export default (props: Props) => {
  function handleClick() {
    props.onClick(props.tab.key)
  }

  const { tab, active } = props
  return (
    <div
      className={`tab-item ${active ? 'active' : ''}`}
      key={tab.key}
      onClick={handleClick}
    >
      <div className="bar" />
      {tab.element}
    </div>
  )
}
