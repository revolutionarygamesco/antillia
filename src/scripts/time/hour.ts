import getDate from './date.ts'

const getHour = (seconds: number = 0): number => {
  const date = getDate(seconds)
  return date.getUTCHours()
}

export default getHour
