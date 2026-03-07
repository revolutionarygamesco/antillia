import { type OutbreakSituation } from './types.ts'
import diseases from './diseases.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import getOutbreakStage from './stage.ts'

describe('getOutbreakStage', () => {
  const situation: OutbreakSituation = {
    storyline: 'outbreak',
    location: 'kingston',
    disease: diseases.get('dysentery')!,
    course: {
      early: [SECONDS_PER_DAY, 7 * SECONDS_PER_DAY],
      mid: [8 * SECONDS_PER_DAY, 28 * SECONDS_PER_DAY],
      late: [29 * SECONDS_PER_DAY, 49 * SECONDS_PER_DAY]
    },
    reactions: {
      early: { tag: 'ignore', effect: 10 },
      mid: { tag: 'fumigation', effect: -5 },
      late: { tag: 'quarantine', effect: -5 }
    },
    twists: {
      early: 'doctor',
      mid: 'doctor',
      late: 'authorities-fled'
    }
  }

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
})
