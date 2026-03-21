import stringUnion, { makeStringUnionGuard } from '../../../utilities/string-union.ts'
import makeArrayGuard from '../../../utilities/guards/array.ts'
import isString from '../../../utilities/guards/string.ts'
import isObject from '../../../utilities/guards/object.ts'

export const grimoireSchools = stringUnion('transmutation', 'evocation',
  'conjuration', 'necromancy', 'enchantment')
export type GrimoireSchool = typeof grimoireSchools[number]
export const isGrimoireSchool = makeStringUnionGuard<GrimoireSchool>(grimoireSchools)

export const grimoireSpells = stringUnion('call', 'thalassomancy', 'curse',
  'mermaid', 'divination', 'time', 'fauna', 'weathercraft', 'eldritch',
  'kraken', 'light', 'ward', 'grave', 'return', 'ferryman', 'spot', 'mists',
  'hex', 'manacles', 'delusions')
export type GrimoireSpell = typeof grimoireSpells[number]
export const isGrimoireSpell = makeStringUnionGuard<GrimoireSpell>(grimoireSpells)
export const isGrimoireSpellArray = makeArrayGuard<GrimoireSpell>(isGrimoireSpell)

export interface Grimoire {
  school: GrimoireSchool
  description: string
  rituals: GrimoireSpell[]
  adj: GrimoireSpell
  occultist: GrimoireSpell
}

export const isGrimoire = (
  candidate: unknown
): candidate is Grimoire => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isGrimoireSchool(obj.school),
    isString(obj.description),
    isGrimoireSpellArray(obj.rituals),
    isGrimoireSpell(obj.adj),
    isGrimoireSpell(obj.occultist)
  ].every(test => test === true)
}

export interface GrimoireSchoolData {
  school: GrimoireSchool
  categories: Array<{ name: string, spells: GrimoireSpell[] }>
}
