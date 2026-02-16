import selectRandomBetween from '../random/between.ts'
import CrewState from './crew.ts'
import GameState from './game.ts'

const addCrews = (
  state: GameState,
  n: number
): CrewState[] => {
  const crews: CrewState[] = []

  for (let i = 0; i < n; i++) {
    const crew = new CrewState()
    crews.push(crew)
    state.crews.set(crew.id, crew)
  }

  return crews
}

describe('GameState', () => {
  describe('constructor', () => {
    it('returns a game state', () => {
      expect(new GameState()).toBeInstanceOf(GameState)
    })

    it('defaults to 0s', () => {
      const { at } = new GameState()
      expect(at).toBe(0)
    })

    it('can be set to a different timestamp', () => {
      const seconds = selectRandomBetween(1000000, 2000000)
      const { at } = new GameState(seconds)
      expect(at).toBe(seconds)
    })

    it('creates a crew by default', () => {
      const { crews } = new GameState()
      expect(crews.size).toBe(1)
    })

    it('defaults to chapter 1', () => {
      const { chapter } = new GameState()
      expect(chapter).toBe(1)
    })

    it('can pick up from a previous state', () => {
      const prev = new GameState()
      prev.chapter = 2
      const { chapter } = new GameState(60, prev)
      expect(chapter).toBe(2)
    })

    it('moves forward with the crews specified', () => {
      const prev = new GameState()
      const [newCrew] = addCrews(prev, 1)
      const { crews } = new GameState(60, prev, newCrew)
      expect(crews.size).toBe(1)
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns an object', () => {
        const state = new GameState()
        const actual = state.toObject()

        expect(actual.at).toBe(state.at)
        expect(actual.chapter).toBe(state.chapter)
        expect(actual.crews.every((({ id }) => {
          return state.crews.has(id)
        }))).toBe(true)
      })
    })

    describe('serialize', () => {
      it('serializes game state', () => {
        const state = new GameState()
        const [newCrew] = addCrews(state, 1)
        const actual = state.serialize()

        expect(actual).toContain('"at":0')
        expect(actual).toContain('"chapter":1')
        expect(actual).toContain(`"id":"${newCrew.id}"`)
      })
    })
  })
})
