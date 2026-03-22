import WindState from './wind.ts'
import { MODULE_ID } from '../settings.ts'

describe('WindState', () => {
  describe('constructor', () => {
    it('returns a wind state', () => {
      expect(new WindState()).toBeInstanceOf(WindState)
    })

    it('initializes wind to level 2', () => {
      const { level } = new WindState()
      expect(level).toBe(2)
    })

    it('can be set to something else', () => {
      const { level } = new WindState(1)
      expect(level).toBe(1)
    })
  })

  describe('Accessor methods', () => {
    describe('label', () => {
      it('expresses the wind level', () => {
        const wind = new WindState()
        expect(wind.label).toBe(`${MODULE_ID}.wind.level.2.title`)
      })
    })
  })
})
