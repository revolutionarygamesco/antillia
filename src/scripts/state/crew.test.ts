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

  describe('Instance methods', () => {
    describe('serialize', () => {
      it('serializes crew state', () => {
        const crew = new CrewState()
        const actual = crew.serialize()
        expect(actual).toContain(`{"id":"${crew.id}"`)
      })
    })
  })
})
