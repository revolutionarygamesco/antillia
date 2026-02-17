import { describe, it, expect } from '@jest/globals'
import { MODULE_ID } from '../../../settings.ts'
import generateRandomFortUpgradeReport from './generate.ts'

describe('generateRandomFortUpgradeReport', () => {
  const possibilities = ['tunnels', 'expansion', 'armor', 'undead']
    .map(leaf => {
      const report = `${MODULE_ID}.intelligence.fort-upgrades.upgrade.${leaf === 'undead' ? 'undead.base' : leaf}`
      const mechanics = `${MODULE_ID}.intelligence.fort-upgrades.mechanics.${leaf}`
      return `<blockquote>${report}</blockquote>${mechanics}`
    })

  it('generates a random fort upgrade report', async () => {
    const { title, report } = await generateRandomFortUpgradeReport()
    expect(title).toBe(`${MODULE_ID}.intelligence.fort-upgrades.title`)
    expect(possibilities).toContain(report)
  })
})
