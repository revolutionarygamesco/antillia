import getWeekday from './weekday.ts'

describe('getWeekday', () => {
  it('returns the day of the week', () => {
    expect(getWeekday()).toBe('Sunday')
  })
})
