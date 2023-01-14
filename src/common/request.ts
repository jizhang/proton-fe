import _ from 'lodash'
import qs from 'qs'
import moment from 'moment'
import { Toast } from 'antd-mobile'
import router from '~/src/router'

const CSRF_STORAGE_KEY = 'csrf'

class RequestError {
  constructor(public code: number, public payload: any) {}
}

export async function request(url: string, config?: RequestInit) {
  let response: Response

  // fetch error
  try {
    response = await fetch(url, config)
  } catch (error) {
    Toast.show({ icon: 'fail', content: String(error) })
    throw new RequestError(0, {
      message: String(error),
      error,
    })
  }

  // success
  if (response.ok) {
    const payload = await response.json()
    return payload.payload || payload
  }

  // 400 Bad Request
  if (response.status === 400) {
    const payload = await response.json()
    // global toast
    if (payload.code === 400) {
      Toast.show({ icon: 'fail', content: payload.message })
    }
    // raise error for downstream processing
    throw new RequestError(payload.code, payload)
  }

  // 401 Unauthorized
  if (response.status === 401) {
    router.navigate('/login')
    throw new RequestError(401, null)
  }

  // other error
  Toast.show({ icon: 'fail', content: response.status + ' ' + response.statusText })
  throw new RequestError(response.status, response.statusText)
}

export async function get(url: string, args?: any) {
  if (!_.isEmpty(args)) {
    url += '?' + qs.stringify(args)
  }
  return await request(url)
}

export async function post(url: string, json?: any) {
  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': await getCsrfToken(),
    },
  }
  if (!_.isEmpty(json)) {
    config.body = JSON.stringify(json)
  }
  return request(url, config)
}

export async function postForm(url: string, form?: any) {
  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-TOKEN': await getCsrfToken(),
    },
  }
  if (!_.isEmpty(form)) {
    config.body = qs.stringify(form)
  }
  return await request(url, config)
}

async function getCsrfToken() {
  const value = localStorage.getItem(CSRF_STORAGE_KEY)
  if (value) {
    const csrf = JSON.parse(value)
    if (moment().isBefore(csrf.expire)) {
      return csrf.token
    }
  }
  const payload = await request('/api/csrf')
  const csrf = {
    token: payload.token,
    expire: moment().add(5, 'minutes'),
  }
  localStorage.setItem(CSRF_STORAGE_KEY, JSON.stringify(csrf))
  return csrf.token
}

export function clearCsrfToken() {
  localStorage.removeItem(CSRF_STORAGE_KEY)
}
