import { isOutbreakReaction } from './types.ts'
import react from './react.ts'

describe('react', () => {
  it('chooses a reaction', () => {
    expect(isOutbreakReaction(react())).toBe(true)
  })
})
