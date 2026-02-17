import { describe, it, expect } from '@jest/globals'
import { UUIDS } from '../../../settings.ts'
import writeFortUpgradeReport from './write.ts'

describe('writeFortUpgradeReport', () => {
  const fort = {
    documentUuid: UUIDS.JOURNAL_FORT_CHARLES,
    name: 'Fort Charles'
  } as TableResult

  it.each([
    ['tunnels', false, 'tunnels'],
    ['tunnels', true, 'tunnels'],
    ['expansion', false, 'expansion'],
    ['expansion', true, 'expansion'],
    ['armor', false, 'armor'],
    ['armor', true, 'armor'],
    ['undead', false, 'undead.base'],
    ['undead', true, 'undead.premium'],
  ] as [string, boolean, string][])('writes a report for %s (premium %s)', (upgrade, premium, expected) => {
    const actual = writeFortUpgradeReport(fort, upgrade, premium)
    expect(actual).toBe(`revolutionary-antillia.intelligence.fort-upgrades.upgrade.${expected}`)
  })
})
