import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Card } from 'antd-mobile'
import _ from 'lodash'
import { RootStoreContext } from '../../stores'
import './UserRetention.less'

export default observer(() => {
  const { dashboardStore } = useContext(RootStoreContext)

  useEffect(() => {
    dashboardStore.fetchUserRetention()
  }, [])

  function formatValue(value: number) {
    let rounded = _.round(value * 100, 1)
    let formatted = '0.0%'
    let color = 'white'
    if (rounded) {
      formatted = rounded + '%'
      color = `rgba(16, 142, 233, ${rounded / 100})`
    }
    return { formatted, color }
  }

  const { userRetention } = dashboardStore
  return (
    <Card
      className="dashboard-user-retention"
      title="User retention"
      extra="6 weeks"
      style={{ borderRadius: 0 }}
    >
      <table className="data-table">
        <tbody>
          <tr>
            <th />
            {_.times(6, i => (
              <th key={i}>W{i}</th>
            ))}
          </tr>
          {userRetention.data.map(row => (
            <tr key={row.week}>
              <th style={{ textAlign: 'left' }}>{row.week}</th>
              {_.times(6, i => {
                let value = _.get(row.data, i, 0)
                let cell = formatValue(value)
                return (
                  <td key={i}>
                    <div
                      className="value"
                      title={cell.formatted}
                      style={{
                        backgroundColor: cell.color,
                      }}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
})
