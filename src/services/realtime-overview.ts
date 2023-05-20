import { get } from '~/src/common/request'

export interface UserSummary {
  userCount: number
  minutes: number[]
  devices: {
    key: string
    value: number
  }[]
}

export async function getUserSummary(): Promise<UserSummary> {
  return get('/api/realtime-overview/user-summary')
}

export interface TopData {
  key: string
  value: number
  percent: number
  chart: number[]
}

export interface ListData {
  data: {
    key: string
    value: number
    percent: number
  }[]
  total: number
}

export async function getUserAcquisitionTop(dimensionName: string): Promise<TopData> {
  return get('/api/realtime-overview/user-acquisition/top', { dimensionName })
}

export async function getUserAcquisitionList(dimensionName: string, page = 1): Promise<ListData> {
  return get('/api/realtime-overview/user-acquisition/list', { dimensionName, page })
}

export async function getAudienceTop(measureName: string): Promise<TopData> {
  return get('/api/realtime-overview/audience/top', { measureName })
}

export async function getAudienceList(measureName: string, page = 1): Promise<ListData> {
  return get('/api/realtime-overview/audience/list', { measureName, page })
}

export async function getViewsByPageTitleTop(): Promise<TopData> {
  return get('/api/realtime-overview/views-by-page-title/top')
}

export async function getViewsByPageTitleList(page = 1): Promise<ListData> {
  return get('/api/realtime-overview/views-by-page-title/list', { page })
}

export async function getEventCountTop(): Promise<TopData> {
  return get('/api/realtime-overview/event-count/top')
}

export async function getEventCountList(page = 1): Promise<ListData> {
  return get('/api/realtime-overview/event-count/list', { page })
}

export async function getEventConversionTop(): Promise<TopData> {
  return get('/api/realtime-overview/event-conversion/top')
}

export async function getEventConversionList(page = 1): Promise<ListData> {
  return get('/api/realtime-overview/event-conversion/list', { page })
}

export async function getUserPropertyTop(): Promise<TopData> {
  return get('/api/realtime-overview/user-property/top')
}

export async function getUserPropertyList(page = 1): Promise<ListData> {
  return get('/api/realtime-overview/user-property/list', { page })
}
