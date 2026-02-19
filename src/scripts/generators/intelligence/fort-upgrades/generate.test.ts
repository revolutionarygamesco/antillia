import { describe, it, expect } from '@jest/globals'
import { MODULE_ID } from '../../../settings.ts'
import generateRandomFortUpgradeReport from './generate.ts'

describe('generateRandomFortUpgradeReport', () => {
  const prefix = `${MODULE_ID}.intelligence.fort-upgrades.upgrade`
  const possibilities = ['tunnels', 'expansion', 'armor', 'undead']
    .map(leaf => `${prefix}.${leaf === 'undead' ? 'undead.base' : leaf}`)

  it('generates a random fort upgrade report', async () => {
    const { title, report } = await generateRandomFortUpgradeReport()
    expect(title).toBe(`${MODULE_ID}.intelligence.fort-upgrades.title`)
    expect(possibilities).toContain(report)
  })
})
