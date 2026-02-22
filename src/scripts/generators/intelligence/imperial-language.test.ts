import { describe, it, expect } from '@jest/globals'
import localize from '../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../settings.ts'
import empires from './shared-data/empires.ts'
import getImperialLanguage from './imperial-language.ts'

describe('getImperialLanguage', () => {
  const prefix = [MODULE_ID, 'factions']
  const cases: Array<[string, string, string | Document]> = []

  for (const empire in empires) {
    const name = localize([...prefix, empire, 'name'])
    const adj = localize([...prefix, empire, 'adj'])
    const lang = localize([...prefix, empire, 'lang'])

    cases.push([lang, adj, adj])
    cases.push([lang, name, name])
    cases.push([lang, `${name} (Document)`, { name } as Document])
  }

  it.each(cases)(
    'returns %s when given %s',
    (expected, _label, input) => {
    expect(getImperialLanguage(input)).toBe(expected)
  })
})
