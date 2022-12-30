import numeral from 'numeral'

export function formatNumber(value: number) {
  if (!value) {
    return '-'
  }
  return numeral(value).format('0,0')
}
