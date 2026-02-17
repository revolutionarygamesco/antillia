import getDate from './date.ts'

const days: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const getWeekday = (seconds: number = 0): string => {
  const date = getDate(seconds)
  const d = date.getUTCDay()
  return days[d]
}

export default getWeekday
