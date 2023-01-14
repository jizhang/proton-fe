import { request, post, clearCsrfToken } from '~/src/common/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface CurrentUser {
  id: number
  nickname: string
}

export async function login(data: LoginRequest): Promise<CurrentUser> {
  return post('/api/login', data)
}

export async function logout() {
  try {
    return await post('/api/logout')
  } finally {
    clearCsrfToken()
  }
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return request('/api/current-user')
}
