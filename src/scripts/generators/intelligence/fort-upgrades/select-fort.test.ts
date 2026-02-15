import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import selectFort from './select-fort.ts'

describe('selectFort', () => {
  const kingston = 'JournalEntry.swgzi8mEAgfLJOEk'
  const fort = 'JournalEntryPage.zPBtUYuNIxPTAZ1z'
  const uuid = [kingston, fort].join('.')

  beforeEach(() => {
    const mockResult = { documentUuid: uuid, name: 'Fort Charles' }
    const mockTable = { draw: async () => ({ results: [mockResult] }) };
    (global as any).fromUuid = async () => mockTable
  })

  afterEach(() => {
    delete (global as any).fromUuid
  })

  it('selects a fort', async () => {
    const actual = await selectFort()
    expect(actual).toBe(`@UUID[${uuid}]{Fort Charles}`)
  })
})
