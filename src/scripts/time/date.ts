import { ZERO_HOUR } from '../settings.ts'

const getDate = (seconds: number = 0): Date => {
  const ms = (ZERO_HOUR + seconds) * 1000
  return new Date(ms)
}

export default getDate
