import DashboardStore from './dashboard'

export default class RootStore {
  public readonly dashboardStore: DashboardStore

  constructor() {
    this.dashboardStore = new DashboardStore(this)
  }
}
