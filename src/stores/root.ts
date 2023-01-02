import LoginStore from './login'
import DashboardStore from './dashboard'

export default class RootStore {
  loginStore: LoginStore
  dashboardStore: DashboardStore

  constructor() {
    this.loginStore = new LoginStore(this)
    this.dashboardStore = new DashboardStore(this)
  }
}
