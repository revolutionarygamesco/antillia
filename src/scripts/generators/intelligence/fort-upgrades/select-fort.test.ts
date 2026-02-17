import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { UUIDS } from '../../../settings.ts'
import selectFort from './select-fort.ts'

describe('selectFort', () => {
  beforeEach(() => {
    const mockResult = { documentUuid: UUIDS.JOURNAL_FORT_CHARLES, name: 'Fort Charles' }
    const mockTable = { draw: async () => ({ results: [mockResult] }) };
    (global as any).fromUuid = async () => mockTable
  })

  afterEach(() => {
    delete (global as any).fromUuid
  })

  it('selects a fort', async () => {
    const actual = await selectFort()
    expect(actual).toBe(`@UUID[${UUIDS.JOURNAL_FORT_CHARLES}]{Fort Charles}`)
  })
})
