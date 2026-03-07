import isWithinRange from './range.ts'

describe('isWithinRange', () => {
  it.each([
    [3, [2, 5]],
    [3, [2, 3, 4, 5]]
  ] as Array<[number, number[]]>)('returns true when number is within range', (n, range) => {
    expect(isWithinRange(n, range)).toBe(true)
  })

  it.each([
    [3, [1, 2]],
    [3, [6, 7, 8, 9]]
  ] as Array<[number, number[]]>)('returns false when number is outside range', (n, range) => {
    expect(isWithinRange(n, range)).toBe(false)
  })

  it.each([
    [3, [1, 3]],
    [3, [3, 4, 5]]
  ] as Array<[number, number[]]>)('can be made exclusive', (n, range) => {
    expect(isWithinRange(n, range, false)).toBe(false)
  })
})
