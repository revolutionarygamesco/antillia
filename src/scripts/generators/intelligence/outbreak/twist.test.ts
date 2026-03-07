import { isOutbreakTwistOrNull, type OutbreakReaction, type OutbreakStage } from './types.ts'
import diseases from './diseases.ts'
import setCourse from './course.ts'
import twist from './twist.ts'

describe('twist', () => {
  it('chooses twists for each stage of the outbreak', () => {
    const disease = diseases.get('dysentery')!
    const reactions: Record<OutbreakStage, OutbreakReaction> = {
      early: { tag: 'quarantine', effect: -5 },
      mid: { tag: 'closure', effect: -40 },
      late: { tag: 'ignore', effect: 0 }
    }

    const course = setCourse(0, disease, reactions)
    const { early, mid, late } = twist(course)

    expect(isOutbreakTwistOrNull(early)).toBe(true)
    expect(isOutbreakTwistOrNull(mid)).toBe(true)
    expect(late).toBeNull()
  })
})
