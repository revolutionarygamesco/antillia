import { primitives } from '../../../utilities/testing/primitives.ts'
import { isGrimoire } from './types.ts'

describe('isGrimoire', () => {
  it.each([
    ...primitives,
    ['an invalid object', { a: 1 }]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isGrimoire(candidate)).toBe(false)
  })

  it('accepts a grimoire', () => {
    expect(isGrimoire({
      school: 'transmutation',
      description: 'stained',
      rituals: [{ tag: 'call', uuid: 'call' }, { tag: 'curse', uuid: 'curse' }],
      adj: 'call',
      occultist: 'curse'
    })).toBe(true)
  })
})
