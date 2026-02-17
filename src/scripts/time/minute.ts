import getDate from './date.ts'

const getMinute = (seconds: number = 0): number => {
  const date = getDate(seconds)
  return date.getUTCMinutes()
}

export default getMinute
