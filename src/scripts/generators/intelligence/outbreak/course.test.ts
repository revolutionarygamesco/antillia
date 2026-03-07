import { type OutbreakStage, type OutbreakReaction } from './types.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import diseases from './diseases.ts'
import setCourse from './course.ts'

describe('setCourse', () => {
  it('sets the course of the outbreak', () => {
    const disease = diseases.get('dysentery')!
    const reactions: Record<OutbreakStage, OutbreakReaction> = {
      early: { tag: 'quarantine', effect: -5 },
      mid: { tag: 'closure', effect: -40 },
      late: { tag: 'ignore', effect: 0 }
    }

    const actual = setCourse(0, disease, reactions)
    const expected: Record<OutbreakStage, [number, number]> = {
      early: [0, 6 * SECONDS_PER_DAY],
      mid: [(6 * SECONDS_PER_DAY) + 1, (21 * SECONDS_PER_DAY) + 1],
      late: [(21 * SECONDS_PER_DAY) + 2, (21 * SECONDS_PER_DAY) + 2]
    }

    expect(actual).toEqual(expected)
  })
})
