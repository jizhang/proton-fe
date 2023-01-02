import { post } from '~/src/common/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  nickname: string
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return post('/api/login', data)
}

export async function logout() {
  return post('/api/logout')
}
