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

    it('initializes crew positions', () => {
      const crew = new CrewState()
      expect(crew.positions.get('captain')?.max).toBe(1)
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

    describe('getCaptain', () => {
      const jack = { id: 'rackham', name: 'Calico Jack', uuid: 'Actor.rackham' } as unknown as Actor

      beforeEach(() => {
        (global as any).fromUuid = async (uuid: string): Promise<Actor | undefined> => {
          return uuid === jack.uuid ? jack : undefined
        }
      })

      afterEach(() => {
        delete (global as any).fromUuid
      })

      it('returns undefined if there is no captain', async () => {
        const crew = new CrewState()
        expect(await crew.getCaptain()).toBeUndefined()
      })

      it('returns undefined if there is no such actor', async () => {
        const crew = new CrewState()
        const data = crew.positions.get('captain')!
        data.assigned = ['jack']
        crew.positions.set('captain', data)
        expect(await crew.getCaptain()).toBeUndefined()
      })

      it('returns the captain actor', async () => {
        const crew = new CrewState()
        const data = crew.positions.get('captain')!
        data.assigned = [jack.id]
        crew.positions.set('captain', data)
        expect(await crew.getCaptain()).toEqual(jack)
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
