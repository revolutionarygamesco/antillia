import getMonth from './month.ts'

describe('getMonth', () => {
  it('returns the month', () => {
    expect(getMonth()).toBe('December')
  })
})
