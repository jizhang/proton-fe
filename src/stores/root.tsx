import DashboardStore from './dashboard'
import LoginStore from './login'

export default class RootStore {
  public readonly dashboardStore: DashboardStore
  public readonly loginStore: LoginStore

  constructor() {
    this.dashboardStore = new DashboardStore(this)
    this.loginStore = new LoginStore(this)
  }
}
