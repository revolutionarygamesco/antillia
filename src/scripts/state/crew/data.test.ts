import { primitives, getPrimitivesExcept } from '../../utilities/testing/primitives.ts'
import CrewState from './class.ts'
import {
  type CrewPosition,
  isCrewPosition,
  isCrewPositionRecord,
  isCrewStateData,
  isCrewStateDataArray
} from './data.ts'

const captain: CrewPosition = {
  id: 'captain',
  assigned: ['rackham'],
  max: 1,
  shares: 2,
  exempt: true,
  exclusive: true,
  required: true
}

describe('isCrewPosition', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isCrewPosition(candidate)).toBe(false)
  })

  it('accepts crew position', () => {
    expect(isCrewPosition(captain)).toBe(true)
  })
})

describe('isCrewPositionRecord', () => {
  it.each([
    ...getPrimitivesExcept('an empty object'),
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isCrewPositionRecord(candidate)).toBe(false)
  })

  it('accepts crew position record', () => {
    expect(isCrewPositionRecord({ captain })).toBe(true)
  })
})

describe('isCrewStateData', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isCrewStateData(candidate)).toBe(false)
  })

  it('accepts crew state data', () => {
    const state = new CrewState()
    expect(isCrewStateData(state.toObject())).toBe(true)
  })
})

describe('isCrewStateDataArray', () => {
  it.each([
    ...getPrimitivesExcept('an array')
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isCrewStateDataArray(candidate)).toBe(false)
  })

  it('rejects a single crew state data object', () => {
    const state = new CrewState()
    expect(isCrewStateDataArray(state.toObject())).toBe(false)
  })

  it('accepts an empty array', () => {
    expect(isCrewStateDataArray([])).toBe(true)
  })

  it('accepts an array of crew state data objects', () => {
    const state = new CrewState()
    expect(isCrewStateDataArray([state.toObject()])).toBe(true)
  })
})
