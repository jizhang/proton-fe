import * as _ from 'lodash'
import * as qs from 'qs'
import * as request from '../services/request'
import RootStore from './root'
import { observable, flow, action } from 'mobx'

export default class LoginStore {
  public readonly rootStore: RootStore

  @observable public form = {
    username: '',
    password: '',
  }

  @observable public currentUser = {
    id: 0,
    nickname: '',
  }

  @observable public loggingOut = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action public updateForm(form: object) {
    _.assign(this.form, form)
  }

  @action public resetForm() {
    this.form.username = ''
    this.form.password = ''
  }

  public login = flow(function * (this: LoginStore) {
    let payload = yield request.post('/api/login', this.form)
    _.assign(this.currentUser, payload)
  })

  public logout = flow(function * (this: LoginStore) {
    this.loggingOut = true
    try {
      yield request.post('/api/logout')
      this.currentUser.id = 0
      this.currentUser.nickname = ''
    } finally {
      this.loggingOut = false
    }
  })
}
