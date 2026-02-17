import getWeekday from './weekday.ts'
import getDoM from './dom.ts'
import getMonth from './month.ts'
import getYear from './year.ts'

export interface GetDayOptions {
  format?: 'American' | 'International'
  weekday?: boolean
}

const getDay = (
  seconds: number = 0,
  options?: GetDayOptions
): string => {
  const format = options?.format ?? 'International'
  const weekday = options?.weekday ?? false

  const dom = getDoM(seconds)
  const month = getMonth(seconds)
  const year = getYear(seconds)

  const base = format === 'American'
    ? `${month} ${dom}, ${year}`
    : `${dom} ${month} ${year}`

  return weekday
    ? `${getWeekday(seconds)}, ${base}`
    : base
}

export default getDay
