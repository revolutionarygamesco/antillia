import { primitives } from '../../utilities/testing/primitives.ts'
import AdventureState from './class.ts'
import { isAdventureStateData } from './data.ts'

describe('isAdventureStateData', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isAdventureStateData(candidate)).toBe(false)
  })

  it('accepts adventure state data', () => {
    const state = new AdventureState()
    expect(isAdventureStateData(state.toObject())).toBe(true)
  })
})

