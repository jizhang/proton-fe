import * as _ from 'lodash'
import * as qs from 'qs'
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
    let response = yield fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(this.form),
    })
    let responseJson = yield response.json()
    if (responseJson.code === 200) {
      _.assign(this.currentUser, responseJson.payload)
    } else {
      throw new Error(responseJson.payload.message)
    }
  })
}
