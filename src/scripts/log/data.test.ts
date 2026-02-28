import { primitives } from '../utilities/testing/primitives.ts'
import LogEntry from './entry.ts'
import { isLogEntryData } from './data.ts'

describe('isLogEntryData', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isLogEntryData(candidate)).toBe(false)
  })

  it('accepts log entry data', () => {
    const entry = new LogEntry()
    expect(isLogEntryData(entry.toObject())).toBe(true)
  })
})
