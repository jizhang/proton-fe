import * as request from '~/src/common/request'

export async function login(data: object) {
  return request.post('/api/login', data)
}
