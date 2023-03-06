import numeral from 'numeral'

export function formatNumber(value: number) {
  if (!value) {
    return '-'
  }
  return numeral(value).format('0,0')
}

export function formatPercent(value: number) {
  if (!value) return '-'
  return Math.round(value * 1000) / 10 + '%'
}
