import AdventureState from './class.ts'

describe('AdventureState', () => {
  describe('constructor', () => {
    it('returns a crew state', () => {
      expect(new AdventureState()).toBeInstanceOf(AdventureState)
    })

    it('sets the initial crew state as playing', () => {
      const state = new AdventureState()
      expect(state.history[0].crews.has(state.playing)).toBe(true)
    })
  })
})
