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

export async function getViewsByPageTitleTop(): Promise<TopData> {
  return get('/api/realtime-overview/views-by-page-title/top')
}

export async function getViewsByPageTitleList(page = 1): Promise<ListData> {
  return get('/api/realtime-overview/views-by-page-title/list', { page })
}

export async function getUserAcquisitionTop(dimensionName: string): Promise<TopData> {
  return get('/api/realtime-overview/user-acquisition/top', { dimensionName })
}

export async function getUserAcquisitionList(dimensionName: string, page = 1): Promise<ListData> {
  return get('/api/realtime-overview/user-acquisition/list', { dimensionName, page })
}
