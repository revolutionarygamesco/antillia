import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import writeFortUpgradeReport from './write.ts'

describe('writeFortUpgradeReport', () => {
  beforeEach(() => {
    const documentUuid = 'JournalEntry.swgzi8mEAgfLJOEk.JournalEntryPage.zPBtUYuNIxPTAZ1z'
    const mockResult = { documentUuid, name: 'Fort Charles' }
    const mockTable = { draw: async () => ({ results: [mockResult] }) };
    (global as any).fromUuid = async () => mockTable
  })

  afterEach(() => {
    delete (global as any).fromUuid
  })

  it('writes a fort upgrade report', async () => {
    const expected = ['tunnels', 'expansion', 'armor', 'undead.base']
      .map(t => `revolutionary-antillia.intelligence.fort-upgrades.type.${t}`)
    const actual = await writeFortUpgradeReport()
    expect(expected).toContain(actual)
  })

  it('writes a fort upgrade report with premium content', async () => {
    const expected = ['tunnels', 'expansion', 'armor', 'undead.premium']
      .map(t => `revolutionary-antillia.intelligence.fort-upgrades.type.${t}`)
    const actual = await writeFortUpgradeReport(true)
    expect(expected).toContain(actual)
  })
})
