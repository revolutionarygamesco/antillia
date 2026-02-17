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

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns an object', () => {
        const state = new AdventureState()
        const actual = state.toObject()

        expect(actual.playing).toBe(state.playing)
        expect(actual.history).toHaveLength(1)

        for (const [index, history] of actual.history.entries()) {
          expect(history).toEqual(state.history[index].toObject())
        }
      })
    })
  })
})
