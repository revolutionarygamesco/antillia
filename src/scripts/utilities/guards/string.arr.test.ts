import { describe, it, expect } from '@jest/globals'
import { getPrimitivesExcept } from '../testing/primitives.ts'
import isStringArray from './string.arr.ts'

describe('isStringArray', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of numbers', [1, 2, 3]],
    ['an array with some strings but not exclusively', ['hello world', false]]
  ] as Array<[string, any]>)('rejects %s', (_label, candidate) => {
    expect(isStringArray(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of strings', ['hello world']]
  ] as Array<[string, any]>)('accepts %s', (_label, candidate) => {
    expect(isStringArray(candidate)).toBe(true)
  })
})
