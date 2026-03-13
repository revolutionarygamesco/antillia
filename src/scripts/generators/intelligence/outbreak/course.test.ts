import { type OutbreakStage, type OutbreakReaction } from './types.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import diseases from './diseases.ts'
import setCourse from './course.ts'

describe('setCourse', () => {
  it('sets the course of the outbreak', () => {
    const disease = diseases.get('dysentery')!
    const reaction: OutbreakReaction = { tag: 'quarantine', effect: -5 }

    const actual = setCourse(0, disease, reaction)
    const expected: Record<OutbreakStage, [number, number]> = {
      early: [0, 7 * SECONDS_PER_DAY],
      mid: [(7 * SECONDS_PER_DAY) + 1, (23 * SECONDS_PER_DAY) + 1],
      late: [(23 * SECONDS_PER_DAY) + 2, (39 * SECONDS_PER_DAY) + 2]
    }

    expect(actual).toEqual(expected)
  })
})
