import * as request from './request'

export async function login(data: object) {
  return request.post('/api/login', data)
}
