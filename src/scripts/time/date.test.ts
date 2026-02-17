import { ZERO_HOUR } from '../settings.ts'
import getDate from './date.ts'

describe('getDate', () => {
  it('returns the date x seconds after zero hour', () => {
    const seconds = 60
    const expected = new Date((ZERO_HOUR + seconds) * 1000)
    expect(getDate(seconds)).toEqual(expected)
  })
})
