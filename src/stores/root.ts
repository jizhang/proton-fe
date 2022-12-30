import DashboardStore from './dashboard'

export default class RootStore {
  dashboardStore

  constructor() {
    this.dashboardStore = new DashboardStore(this)
  }
}
