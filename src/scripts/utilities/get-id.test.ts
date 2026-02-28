import generateId from './generate-id.ts'
import getId from './get-id.ts'

describe('getId', () => {
  it('extracts the unique ID from a Foundry UUID', () => {
    const id = generateId()
    const uuid = `JournalEntry.${generateId()}.JournalEntryPage.${id}`
    expect(getId(uuid)).toBe(id)
  })
})
