import getHour from './hour.ts'

describe('getHour', () => {
  it('returns the hour', () => {
    expect(getHour()).toBe(12)
  })
})
