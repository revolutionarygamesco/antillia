import selectRandomBetween from '../random/between.ts'
import GameState from './game.ts'

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
  })
})
