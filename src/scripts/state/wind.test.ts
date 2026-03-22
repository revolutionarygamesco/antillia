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

    describe('description', () => {
      it('expresses the wind description', () => {
        const wind = new WindState()
        expect(wind.description).toBe(`${MODULE_ID}.wind.level.2.description`)
      })
    })
  })

  describe('Instance methods', () => {
    describe('incr', () => {
      it('increases the wind level', () => {
        const wind = new WindState()
        wind.incr()
        expect(wind.level).toBe(3)
      })

      it('won’t increase the wind level past 4', () => {
        const wind = new WindState(4)
        wind.incr()
        expect(wind.level).toBe(4)
      })
    })

    describe('decr', () => {
      it('decreases the wind level', () => {
        const wind = new WindState()
        wind.decr()
        expect(wind.level).toBe(1)
      })

      it('won’t decrease the wind level below 1', () => {
        const wind = new WindState(1)
        wind.decr()
        expect(wind.level).toBe(1)
      })
    })
  })
})
