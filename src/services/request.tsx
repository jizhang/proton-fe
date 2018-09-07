import _ from 'lodash'
import qs from 'qs'
import { Toast } from 'antd-mobile'

class RequestError {
  constructor(public code: number, public payload: any) {}
}

export async function request(url: string, config?: RequestInit) {
  let response = await fetch(url, config)
  if (response.ok) {
    let success = await response.json()
    return success.payload
  }

  if (response.status === 400) {
    let failure = await response.json()
    if (failure.code === 400) {
      Toast.fail(failure.payload.message)
    }
    throw new RequestError(failure.code, failure.payload)
  }

  throw new RequestError(response.status, response.statusText)
}

export async function get(url: string, args?: any) {
  if (!_.isEmpty(args)) {
    url += '?' + qs.stringify(args)
  }
  return await request(url)
}

export async function post(url: string, form?: any) {
  let config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  if (!_.isEmpty(form)) {
    config.body = qs.stringify(form)
  }
  return await request(url, config)
}
