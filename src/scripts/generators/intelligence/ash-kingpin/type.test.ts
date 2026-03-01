import { primitives } from '../../../utilities/testing/primitives.ts'
import { type AshKingpin, isAshKingpin, isAshKingpinStoryline } from './type.ts'

describe('isAshKingpin', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isAshKingpin(candidate)).toBe(false)
  })

  it('accepts an ash kingpin', () => {
    expect(isAshKingpin({
      name: 'Wilson Fisk',
      gender: 'Masculine'
    })).toBe(true)
  })
})

describe('isAshKingpinStoryline', () => {
  const kingpin: AshKingpin = { name: 'Wilson Fisk', gender: 'Masculine' }

  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isAshKingpinStoryline(candidate)).toBe(false)
  })

  it.each([
    ['with no resident kingpin', null],
    ['with a resident kingpin', kingpin],
  ] as Array<[string, unknown]>)('accepts an ash kingpin storyline %s', (_label, resident) => {
    expect(isAshKingpinStoryline({ storyline: 'ash-kingpin', location: 'nyc', resident })).toBe(true)
  })
})
