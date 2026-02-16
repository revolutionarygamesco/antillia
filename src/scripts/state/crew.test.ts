import CrewState from './crew.ts'

describe('CrewState', () => {
  describe('constructor', () => {
    it('returns a crew state', () => {
      expect(new CrewState()).toBeInstanceOf(CrewState)
    })

    it('gives the crew a random 16-character ID', () => {
      const crew = new CrewState()
      expect(crew.id).toHaveLength(16)
    })
  })
})
