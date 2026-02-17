import getDate from './date.ts'

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const getMonth = (seconds: number = 0): string => {
  const date = getDate(seconds)
  const m = date.getUTCMonth()
  return months[m]
}

export default getMonth
