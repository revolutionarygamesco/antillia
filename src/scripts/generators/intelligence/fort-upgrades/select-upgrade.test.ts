import { describe, it, expect } from '@jest/globals'
import selectFortUpgrade, { upgrades } from './select-upgrade.ts'

describe('selectFortUpgrade', () => {
  it('selects a fort upgrade', () => {
    const actual = selectFortUpgrade()
    expect(upgrades).toContain(actual)
  })
})
