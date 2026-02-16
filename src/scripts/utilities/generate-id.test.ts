import { describe, it, expect } from '@jest/globals'
import generateID from './generate-id.ts'

describe('generateID', () => {
  it('generates a 16-digit ID', () => {
    const actual = generateID()
    expect(actual.length).toBe(16)
  })
})
