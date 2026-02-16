import {getPrimitivesExcept, primitives} from '../../utilities/testing/primitives.ts'
import GameState from './class.ts'
import { isGameStateData, isGameStateDataArray } from './data.ts'

describe('isGameStateData', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isGameStateData(candidate)).toBe(false)
  })

  it('accepts game state data', () => {
    const state = new GameState()
    expect(isGameStateData(state.toObject())).toBe(true)
  })
})

describe('isGameStateDataArray', () => {
  it.each([
    ...getPrimitivesExcept('an array')
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isGameStateDataArray(candidate)).toBe(false)
  })

  it('rejects a single game state data object', () => {
    const state = new GameState()
    expect(isGameStateDataArray(state.toObject())).toBe(false)
  })

  it('accepts an empty array', () => {
    expect(isGameStateDataArray([])).toBe(true)
  })

  it('accepts an array of game state data objects', () => {
    const state = new GameState()
    expect(isGameStateDataArray([state.toObject()])).toBe(true)
  })
})
