import { MODULE_ID } from '../settings.ts'
import getDay, { type GetDayOptions } from './day.ts'

describe('getDay', () => {
  it('returns the date', () => {
    const expected = `21 ${MODULE_ID}.dates.months.m12 1721`
    expect(getDay()).toBe(expected)
  })

  it('can return the date in American format', () => {
    const expected = `${MODULE_ID}.dates.months.m12 21, 1721`
    const options: GetDayOptions = { format: 'American' }
    expect(getDay(0, options)).toBe(expected)
  })

  it('can include the weekday', () => {
    const expected = `${MODULE_ID}.dates.days.d1, 21 ${MODULE_ID}.dates.months.m12 1721`
    const options: GetDayOptions = { weekday: true }
    expect(getDay(0, options)).toBe(expected)
  })

  it('can include the weekday and use American format', () => {
    const expected = `${MODULE_ID}.dates.days.d1, ${MODULE_ID}.dates.months.m12 21, 1721`
    const options: GetDayOptions = { weekday: true, format: 'American' }
    expect(getDay(0, options)).toBe(expected)
  })
})
