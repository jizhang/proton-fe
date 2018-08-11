import * as _ from 'lodash'
import { observable, flow, action } from 'mobx'
import RootStore from './root'

export default class DashboardStore {
  public readonly rootStore: RootStore

  @observable public realtime = {
    count: 0,
    previousCount: 0,
    minutes: [] as number[],
  }

  @observable public userRetention = {
    data: [] as any[],
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  public fetchActiveUser = flow(function * (this: DashboardStore) {
    let response = yield fetch('/api/dashboard/activeUser')
    let { payload } = yield response.json()
    _.assign(this.realtime, {
      previousCount: this.realtime.count,
      ...payload,
    })
  })

  public fetchUserRetention = flow(function * (this: DashboardStore) {
    let response = yield fetch('/api/dashboard/userRetention')
    let { payload } = yield response.json()
    this.userRetention.data = payload.retention
  })
}
