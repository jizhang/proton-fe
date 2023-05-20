import { useEffect, useRef } from 'react'
import numeral from 'numeral'

export function formatInteger(value: number) {
  if (!value) return '-'
  return numeral(value).format('0,0')
}

export function formatPercent(value: number) {
  if (!value) return '-'
  return Math.round(value * 1000) / 10 + '%'
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
