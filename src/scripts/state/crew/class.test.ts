import CrewState from './class.ts'

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
    describe('toObject', () => {
      it('returns an object', () => {
        const crew = new CrewState()
        const actual = crew.toObject()

        expect(actual.id).toBe(crew.id)
      })
    })

    describe('serialize', () => {
      it('serializes crew state', () => {
        const crew = new CrewState()
        const actual = crew.serialize()
        expect(actual).toContain(`{"id":"${crew.id}"`)
      })
    })
  })

  describe('Class methods', () => {
    describe('deserialize', () => {
      it('returns null if given an invalid string', () => {
        const actual = CrewState.deserialize('lol nope')
        expect(actual).toBeNull()
      })

      it('deserializes crew state', () => {
        const before = new CrewState()
        const actual = CrewState.deserialize(before.serialize())
        expect(actual).toEqual(before)
      })
    })
  })
})
