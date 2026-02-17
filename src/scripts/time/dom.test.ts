import getDoM from './dom.ts'

describe('getDoM', () => {
  it('returns the day of the month', () => {
    expect(getDoM()).toBe(21)
  })
})
