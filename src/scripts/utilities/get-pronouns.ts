import capitalize from './capital.ts'
import localize from './wrappers/localize.ts'
import { MODULE_ID } from '../settings.ts'

export interface Pronouns {
  s: string // Subjective
  S: string // Subjective (capitalized)
  o: string // Objective
  O: string // Objective (capitalized)
  pa: string // Possessive adjective
  PA: string // Possessive adjective (capitalized)
  pp: string // Possessive pronoun
  PP: string // Possessive pronoun (capitalized)
}

const getPronouns = (gender: string): Pronouns => {
  const g = gender.toLowerCase() === 'feminine'
    ? 'feminine'
    : 'masculine' // The 18th century was a less enlightened time.
  const prefix = [MODULE_ID, 'pronouns', g]

  const s = localize([...prefix, 'sub'])
  const o = localize([...prefix, 'obj'])
  const pa = localize([...prefix, 'pos', 'adj'])
  const pp = localize([...prefix, 'pos', 'pro'])

  const S = capitalize(s)
  const O = capitalize(o)
  const PA = capitalize(pa)
  const PP = capitalize(pp)

  return { s, S, o, O, pa, PA, pp, PP }
}

export default getPronouns
