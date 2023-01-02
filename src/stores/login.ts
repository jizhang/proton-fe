import { makeAutoObservable, runInAction } from 'mobx'
import RootStore from './root'
import * as service from '~/src/services/login'

function getDefaultCurrentUser() {
  return {
    id: 0,
    nickname: '',
  }
}

export default class LoingStore {
  rootStore: RootStore

  loggingIn = false
  loggingOut = false
  currentUser: service.LoginResponse = getDefaultCurrentUser()

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  async login(data: service.LoginRequest) {
    this.loggingIn = true
    try {
      const payload = await service.login(data)
      runInAction(() => {
        this.currentUser = payload
      })
    } finally {
      runInAction(() => {
        this.loggingIn = false
      })
    }
  }

  async logout() {
    this.loggingOut = true
    try {
      await service.logout()
      runInAction(() => {
        this.currentUser = getDefaultCurrentUser()
      })
    } finally {
      runInAction(() => {
        this.loggingOut = false
      })
    }
  }
}
