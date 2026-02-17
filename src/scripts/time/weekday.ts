import getDate from './date.ts'
import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../settings.ts'

const getWeekday = (seconds: number = 0): string => {
  const date = getDate(seconds)
  const d = date.getUTCDay()
  return localize([MODULE_ID, 'dates', 'days', `d${d + 1}`])
}

export default getWeekday
