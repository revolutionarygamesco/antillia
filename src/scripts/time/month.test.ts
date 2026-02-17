import { MODULE_ID } from '../settings.ts'
import getMonth from './month.ts'

describe('getMonth', () => {
  it('returns the month', () => {
    expect(getMonth()).toBe(`${MODULE_ID}.dates.months.m12`)
  })
})
