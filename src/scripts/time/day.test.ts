import getDay from './day.ts'

describe('getDay', () => {
  it('returns the date', () => {
    expect(getDay()).toBe('21 December 1721')
  })

  it('can return the date in American format', () => {
    expect(getDay(0, { format: 'American' })).toBe('December 21, 1721')
  })

  it('can include the weekday', () => {
    expect(getDay(0, { weekday: true })).toBe('Sunday, 21 December 1721')
  })

  it('can include the weekday and use American format', () => {
    expect(getDay(0, { weekday: true, format: 'American' })).toBe('Sunday, December 21, 1721')
  })
})
