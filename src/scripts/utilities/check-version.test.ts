import { describe, it, expect } from '@jest/globals'
import checkVersion from './check-version.ts'

describe('checkVersion', () => {
  it('checks the version of content loaded', async () => {
    const { tag, premium, historical } = await checkVersion()
    expect(tag).toBe('demo')
    expect(premium).toBe(false)
    expect(historical).toBe(false)
  })
})
