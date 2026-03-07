import { type OutbreakSituation } from './types.ts'
import diseases from './diseases.ts'
import getOutbreakStage from './stage.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'

describe('getOutbreakStage', () => {
  const situation: OutbreakSituation = {
    storyline: 'outbreak',
    location: 'kingston',
    disease: diseases.get('dysentery')!,
    onset: 0,
    impact: 1,
    reactions: {
      early: 'ignore',
      mid: 'fumigation',
      late: 'ignore'
    },
    twists: {
      early: 'doctor',
      mid: 'doctor',
      late: 'authorities-fled'
    }
  }

  beforeEach(() => {
    situation.impact = 1
  })

  it.each([
    ['early', 5],
    ['mid', 20],
    ['late', 40]
  ] as Array<[string, number]>)('returns %s at %d days', (expected, days) => {
    const actual = getOutbreakStage(situation, days * SECONDS_PER_DAY)
    expect(actual).toBe(expected)
  })

  it.each([
    ['before', -4],
    ['after', 100]
  ] as Array<[string, number]>)('returns null when %s outbreak', (_label, days) => {
    const actual = getOutbreakStage(situation, days * SECONDS_PER_DAY)
    expect(actual).toBeNull()
  })

  it.each([
    ['early', 3],
    ['late', 20],
    [null, 40]
  ] as Array<[string | null, number]>)('returns %s at %d days (impact)', (expected, days) => {
    situation.impact = 0.5
    const actual = getOutbreakStage(situation, days * SECONDS_PER_DAY)
    expect(actual).toBe(expected)
  })
})
