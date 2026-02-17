import getDate from './date.ts'

const getDoM = (seconds: number = 0): number => {
  const date = getDate(seconds)
  return date.getUTCDate()
}

export default getDoM
