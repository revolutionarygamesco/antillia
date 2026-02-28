import LogEntry, { type LogEntryData } from './entry.ts'

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
})
