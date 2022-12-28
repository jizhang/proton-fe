import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import RootStore from './root'

export default class DashboardStore {
  rootStore

  realtime = {
    count: 0,
    previousCount: 0,
    minutes: [] as number[],
  }

  userRetention = {
    data: [] as any[],
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  *fetchActiveUser(): any {
    let response = yield fetch('/api/dashboard/activeUser')
    let { payload } = yield response.json()
    _.assign(this.realtime, {
      previousCount: this.realtime.count,
      ...payload,
    })
  }

  *fetchUserRetention(): any {
    let response = yield fetch('/api/dashboard/userRetention')
    let { payload } = yield response.json()
    this.userRetention.data = payload.retention
  }
}
