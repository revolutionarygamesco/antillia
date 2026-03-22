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

    it('will set to 1 if given something lower', () => {
      const { level } = new WindState(0)
      expect(level).toBe(1)
    })

    it('will set to 4 if given something bigger', () => {
      const { level } = new WindState(10)
      expect(level).toBe(4)
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
    describe('set', () => {
      it('sets the wind level', () => {
        const wind = new WindState()
        wind.set(4)
        expect(wind.level).toBe(4)
      })

      it('won’t set the wind level above 4', () => {
        const wind = new WindState(4)
        wind.set(10)
        expect(wind.level).toBe(4)
      })

      it('won’t set the wind level below 1', () => {
        const wind = new WindState(4)
        wind.set(0)
        expect(wind.level).toBe(1)
      })
    })

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
