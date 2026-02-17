import getYear from './year.ts'

describe('getYear', () => {
  it('returns the year', () => {
    expect(getYear()).toBe(1721)
  })
})
