import getDate from './date.ts'

const getYear = (seconds: number = 0): number => {
  const date = getDate(seconds)
  return date.getUTCFullYear()
}

export default getYear
