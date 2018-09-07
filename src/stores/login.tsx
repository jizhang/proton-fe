import  _ from 'lodash'
import * as request from '../services/request'
import RootStore from './root'
import { observable, flow, action } from 'mobx'

interface ValidateError {
  field: string,
  message: string,
}

interface FormItem {
  value: string,
  errors?: ValidateError[],
}

interface LoginForm {
  username: FormItem,
  password: FormItem,
}

function defaultForm(): LoginForm {
  return {
    username: { value: '' },
    password: { value: '' },
  }
}

export default class LoginStore {
  public readonly rootStore: RootStore

  @observable public form: LoginForm = defaultForm()

  @observable public currentUser = {
    id: 0,
    nickname: '',
  }

  @observable public loggingIn = false
  @observable public loggingOut = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action public updateForm(form: any) {
    _.assign(this.form, form)
  }

  @action public resetForm() {
    this.form = defaultForm()
  }

  public login = flow(function * (this: LoginStore) {
    try {
      let form = _.mapValues(this.form, 'value')
      let payload = yield request.post('/api/login', form)
      _.assign(this.currentUser, payload)
    } finally {
      this.loggingIn = false
    }
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
