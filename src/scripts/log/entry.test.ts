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
})
