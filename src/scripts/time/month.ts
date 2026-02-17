import getDate from './date.ts'
import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../settings.ts'

const getMonth = (seconds: number = 0): string => {
  const date = getDate(seconds)
  const m = date.getUTCMonth()
  const code = 'm' + (m + 1).toString().padStart(2, '0')
  return localize([MODULE_ID, 'dates', 'months', code])
}

export default getMonth
