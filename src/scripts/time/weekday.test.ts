import { MODULE_ID } from '../settings.ts'
import getWeekday from './weekday.ts'

describe('getWeekday', () => {
  it('returns the day of the week', () => {
    expect(getWeekday()).toBe(`${MODULE_ID}.dates.days.d1`)
  })
})
