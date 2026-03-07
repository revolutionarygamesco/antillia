import { isOutbreakReaction } from './types.ts'
import react from './react.ts'

describe('react', () => {
  it('chooses a reaction', () => {
    const { early, mid, late } = react()
    expect(isOutbreakReaction(early)).toBe(true)
    expect(isOutbreakReaction(mid)).toBe(true)
    expect(isOutbreakReaction(late)).toBe(true)
  })
})
