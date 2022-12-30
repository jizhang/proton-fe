import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import RootStore from './root'
import * as service from '~/src/services/dashboard'

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
    const payload = yield service.getActiveUser()
    _.assign(this.realtime, {
      previousCount: this.realtime.count,
      ...payload,
    })
  }

  *fetchUserRetention(): any {
    const payload = yield service.getUserRetention()
    this.userRetention.data = payload.retention
  }
}
