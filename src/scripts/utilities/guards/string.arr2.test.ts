import { describe, it, expect } from '@jest/globals'
import { getPrimitivesExcept } from '../testing/primitives.ts'
import isStringArray2 from './string.arr2.ts'

describe('isStringArray2', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of numbers', [1, 2, 3]],
    ['an array of strings', ['hello world']],
    ['an array with some arrays of strings but not exclusively', [['hello'], 'world']]
  ] as Array<[string, any]>)('rejects %s', (_label, candidate) => {
    expect(isStringArray2(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of arrays of strings', [['hello world']]]
  ] as Array<[string, any]>)('accepts %s', (_label, candidate) => {
    expect(isStringArray2(candidate)).toBe(true)
  })
})
