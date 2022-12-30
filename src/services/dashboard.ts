import { get } from '~/src/common/request'

export async function getActiveUser() {
  return get('/api/dashboard/activeUser')
}

export async function getUserRetention() {
  return get('/api/dashboard/userRetention')
}

export async function getPrimaryData() {
  return get('/api/dashboard/primaryData')
}

export async function getGeoChina() {
  return get('/api/dashboard/geoChina')
}

export async function getUserGeo() {
  return get('/api/dashboard/userGeo')
}

export async function getUserDevice() {
  return get('/api/dashboard/userDevice')
}

export async function getUserSource() {
  return get('/api/dashboard/userSource')
}

export async function getActiveHourlyUsers() {
  return get('/api/dashboard/activeHourlyUsers')
}
