import { get } from '~/src/common/request'

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
