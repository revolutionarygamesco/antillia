import { type LogEntryData } from './data.ts'
import getDay from '../time/day.ts'
import LogEntry from './entry.ts'

describe('LogEntry', () => {
  describe('constructor', () => {
    it('returns a log entry', () => {
      expect(new LogEntry()).toBeInstanceOf(LogEntry)
    })

    it('starts at 0', () => {
      const entry = new LogEntry()
      expect(entry.at).toBe(0)
    })

    it('can be set to something else', () => {
      const entry = new LogEntry({ at: 600 })
      expect(entry.at).toBe(600)
    })

    it('defaults to a null string', () => {
      const entry = new LogEntry()
      expect(entry.text).toBe('')
    })

    it('can be set to something', () => {
      const entry = new LogEntry({ text: 'tested' })
      expect(entry.text).toBe('tested')
    })

    it('defaults to no location', () => {
      const entry = new LogEntry()
      expect(entry.location).toBeUndefined()
    })

    it('can be set to a location', () => {
      const entry = new LogEntry({ location: 'here' })
      expect(entry.location).toBe('here')
    })

    it('defaults to no storyline', () => {
      const entry = new LogEntry()
      expect(entry.location).toBeUndefined()
    })

    it('can be tied to a storyline', () => {
      const entry = new LogEntry({ storyline: 'testing' })
      expect(entry.storyline).toBe('testing')
    })
  })

  describe('Accessor methods', () => {
    describe('html', () => {
      it('returns a null string if there’s nothing to write', () => {
        const entry = new LogEntry()
        expect(entry.html).toBe('')
      })

      it.each([
        [
          'at and location',
          { at: 600, location: 'here' },
          '<dt hidden data-at="600" data-location="here"></dt><dd hidden></dd>'
        ],
        [
          'at and storyline',
          { at: 600, storyline: 'testing' },
          '<dt hidden data-at="600" data-storyline="testing"></dt><dd hidden></dd>'
        ],
        [
          'at, location, and storyline',
          { at: 600, location: 'here', storyline: 'testing' },
          '<dt hidden data-at="600" data-location="here" data-storyline="testing"></dt><dd hidden></dd>'
        ]
      ] as Array<[string, LogEntryData, string]>)('returns a hidden entry if there’s only %s', (_label, data, expected) => {
        const entry = new LogEntry(data)
        expect(entry.html).toBe(expected)
      })

      it('returns the HTML form of the entry', () => {
        const at = 600
        const text = 'Hello, world!'
        const location = 'here'
        const storyline = 'testing'
        const entry = new LogEntry({ at, text, location, storyline })
        const expected = `<dt data-at="${at}" data-location="${location}" data-storyline="${storyline}">${getDay(at, { weekday: true })}</dt><dd>${text}</dd>`
        expect(entry.html).toBe(expected)
      })
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      const core: LogEntryData = { at: 600, text: 'Hello, world!' }

      it.each([
        ['', core],
        [' with a location', { ...core, location: 'here' }],
        [' with a storyline', { ...core, storyline: 'testing' }]
      ] as Array<[string, LogEntryData]>)('returns an object%s', (_label, data) => {
        const entry = new LogEntry(data)
        expect(entry.toObject()).toEqual(data)
      })
    })

    describe('serialize', () => {
      it('serializes log entry', () => {
        const entry = new LogEntry()
        const actual = entry.serialize()
        expect(actual).toBe('{"at":0,"text":""}')
      })
    })
  })

  describe('Class methods', () => {
    describe('deserialize', () => {
      it('returns null if given an invalid string', () => {
        const actual = LogEntry.deserialize('lol nope')
        expect(actual).toBeNull()
      })

      it('deserializes log entry object', () => {
        const before = new LogEntry()
        const actual = LogEntry.deserialize(before.serialize())
        expect(actual).toEqual(before)
      })
    })
  })
})
