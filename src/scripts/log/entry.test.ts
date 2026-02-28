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

    it('defaults to no payload', () => {
      const entry = new LogEntry()
      expect(entry.payload).toBeUndefined()
    })

    it('can be given a payload', () => {
      const entry = new LogEntry({ payload: { a: 1 } })
      expect((entry.payload as any)?.a).toBe(1)
    })
  })

  describe('Accessor methods', () => {
    describe('html', () => {
      it('returns a null string if there’s nothing to write', () => {
        const entry = new LogEntry()
        expect(entry.html).toBe('')
      })

      it('returns a hidden entry if there’s only a payload', () => {
        const data: Partial<LogEntryData> = { at: 600, payload: { a: 1 } }
        const escapedPayload = encodeURIComponent('{"a":1}')
        const expected = `<dt hidden data-at="600" data-payload="${escapedPayload}"></dt><dd hidden></dd>`
        const entry = new LogEntry(data)
        expect(entry.html).toBe(expected)
      })

      it('returns the HTML form of the entry', () => {
        const at = 600
        const text = 'Hello, world!'
        const escapedPayload = encodeURIComponent('{"a":1}')
        const entry = new LogEntry({ at, text, payload: { a: 1 } })
        const expected = `<dt data-at="${at}" data-payload="${escapedPayload}">${getDay(at, { weekday: true })}</dt><dd>${text}</dd>`
        expect(entry.html).toBe(expected)
      })
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      const core: LogEntryData = { at: 600, text: 'Hello, world!' }

      it.each([
        ['', core],
        [' with a payload', { ...core, payload: { a: 1 } }]
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

    describe('parse', () => {
      it('returns null if given an invalid string', () => {
        const actual = LogEntry.parse('lol nope')
        expect(actual).toBeNull()
      })

      it('parses valid HTML into a log entry', () => {
        const at = 600
        const text = 'Hello, world!'
        const escapedPayload = encodeURIComponent('{"a":1}')
        const html = `<dt data-at="${at}" data-payload="${escapedPayload}">${getDay(at, { weekday: true })}</dt><dd>${text}</dd>`
        const actual = LogEntry.parse(html)
        expect(actual?.html).toEqual(html)
        expect(actual?.toObject()).toEqual((new LogEntry({ at, text, payload: { a: 1 } }).toObject()))
      })
    })
  })
})
