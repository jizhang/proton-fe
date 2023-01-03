import React from 'react'
import { Tab } from './Tabs'
import * as styles from './Tabs.module.less'

interface Props {
  tab: Tab
  active: boolean
  onClick: (key: string) => void
}

export default (props: Props) => {
  function handleClick() {
    props.onClick(props.tab.key)
  }

  const { tab, active } = props
  return (
    <div className={`${styles.tabItem} ${active ? styles.active : ''}`} key={tab.key} onClick={handleClick}>
      <div className={styles.bar} />
      {tab.element}
    </div>
  )
}
