import isGuineaman from './check.ts'

describe('isGuineaman', () => {
  it('returns false if not historical', () => {
    expect(isGuineaman({}, false, true)).toBe(false)
  })

  it('returns false if historical but requested false', () => {
    expect(isGuineaman({}, true, false)).toBe(false)
  })

  it('returns true if historical and requested true', () => {
    expect(isGuineaman({}, true, true)).toBe(true)
  })

  it('returns false if given a naval vessel', () => {
    expect(isGuineaman({ use: 'Naval' }, true, true)).toBe(false)
  })

  it('returns false if given a privateer vessel', () => {
    expect(isGuineaman({ use: 'Privateer' }, true, true)).toBe(false)
  })

  it('returns false if given a pirate vessel', () => {
    expect(isGuineaman({ pirate: true }, true, true)).toBe(false)
  })

  it('returns true if historical, requested, and given a merchant vesel', () => {
    expect(isGuineaman({ use: 'Merchant' }, true, true)).toBe(true)
  })
})
