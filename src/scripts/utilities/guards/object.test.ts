import { describe, it, expect } from '@jest/globals'
import { getPrimitivesExcept } from '../../utilities/testing/primitives.ts'
import isObject from './object.ts'

describe('isObject', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ] as Array<[string, any]>)('rejects %s', (_label, candidate) => {
    expect(isObject(candidate)).toBe(false)
  })

  it.each([
    ['an empty object', {}],
    ['an arbitrary object', { a: 1 }]
  ] as Array<[string, any]>)('accepts %s', (_label, candidate) => {
    expect(isObject(candidate)).toBe(true)
  })
})
