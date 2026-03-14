import { isUprisingStoryline } from './types.ts'
import { primitives } from '../../../utilities/testing/primitives.ts'

describe('isUprisingStoryline', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isUprisingStoryline(candidate)).toBe(false)
  })

  it('accepts an uprising storyline', () => {
    expect(isUprisingStoryline({
      storyline: 'slave-uprising',
      location: 'jamaica',
      at: 0,
      tag: 'plantation',
      twist: 'priestess',
      response: 'patrols',
      alarm: 1
    })).toBe(true)
  })
})
