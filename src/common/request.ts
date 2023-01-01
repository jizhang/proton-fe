import _ from 'lodash'
import qs from 'qs'
import { Toast } from 'antd-mobile'

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
    const success = await response.json()
    return success.payload
  }

  // 400 Bad Request
  if (response.status === 400) {
    const failure = await response.json()
    // global toast
    if (failure.code === 400) {
      Toast.show({ icon: 'fail', content: failure.payload.message })
    }
    // raise error for downstream processing
    throw new RequestError(failure.code, failure.payload)
  }

  // 401 Unauthorized
  if (response.status === 401) {
    // TODO redirect to /login
  }

  // other error
  throw new RequestError(response.status, response.statusText)
}

export async function get(url: string, args?: any) {
  if (!_.isEmpty(args)) {
    url += '?' + qs.stringify(args)
  }
  return await request(url)
}

export async function post(url: string, form?: any) {
  const config: RequestInit = {
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
