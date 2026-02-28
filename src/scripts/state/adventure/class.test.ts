import selectRandomBetween from '../../random/between.ts'
import ExploitRecord from '../exploits/class.ts'
import GameState from '../game/class.ts'
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

    it('initializes chapter start and end dates', () => {
      const state = new AdventureState()
      expect(state.chapters).toEqual([
        { n: 1, start: 0, end: null },
        { n: 2, start: null, end: null },
        { n: 3, start: null, end: null },
        { n: 4, start: null, end: null },
        { n: 5, start: null, end: null },
        { n: 6, start: null, end: null }
      ])
    })

    it('can load existing chapter start and end dates', () => {
      const before = new AdventureState()
      before.chapters[0].end = 10
      before.chapters[1].start = 10

      const actual = new AdventureState(before)
      expect(actual.chapters).toEqual([
        { n: 1, start: 0, end: 10 },
        { n: 2, start: 10, end: null },
        { n: 3, start: null, end: null },
        { n: 4, start: null, end: null },
        { n: 5, start: null, end: null },
        { n: 6, start: null, end: null }
      ])
    })

    it('initializes exploit records', () => {
      const state = new AdventureState()
      expect(state.exploits.size).toBe(0)
    })

    it('can load exploits', () => {
      const id = 'rackham'
      const before = new AdventureState()
      before.exploits.set(id, new ExploitRecord({ id }))

      const actual = new AdventureState(before)
      expect(actual.exploits.size).toBe(1)
      expect(actual.exploits.get(id)).toEqual({ id, exploits: [] })
    })
  })

  describe('Accessor methods', () => {
    describe('mostRecentState', () => {
      it('returns the most recent game state in the history', () => {
        const newStateAt = selectRandomBetween(300, 600)
        const adventure = new AdventureState()
        adventure.history.push(new GameState(newStateAt, adventure.history[0]))
        const actual = adventure.mostRecentState
        expect(actual.at).toBe(newStateAt)
      })
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

    describe('serialize', () => {
      it('serializes game state', () => {
        const state = new AdventureState()
        const actual = state.serialize()

        expect(actual).toContain(`"playing":"${state.playing}"`)
        expect(actual).toContain('"chapter":1')
        expect(actual).toContain(`"id":"${state.playing}"`)
      })
    })

    describe('getChapter', () => {
      let state: AdventureState

      beforeEach(() => {
        state = new AdventureState()
        state.chapters[0].end = 10
        state.chapters[1].start = 10
        state.chapters[1].end = 20
        state.chapters[2].start = 20
      })

      it('returns the chapter at a given world time', () => {
        const actual = state.getChapter(15)
        expect(actual).toEqual({ n: 2, start: 10, end: 20 })
      })

      it('can get a chapter that hasn’t ended yet', () => {
        const actual = state.getChapter(60)
        expect(actual).toEqual({ n: 3, start: 20, end: null })
      })
    })
  })

  describe('Class methods', () => {
    describe('deserialize', () => {
      it('returns null if given an invalid string', () => {
        const actual = AdventureState.deserialize('lol nope')
        expect(actual).toBeNull()
      })

      it('deserializes adventure state', () => {
        const before = new AdventureState()
        const actual = AdventureState.deserialize(before.serialize())
        expect(actual).toEqual(before)
      })
    })
  })
})
