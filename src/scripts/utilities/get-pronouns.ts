import localize from './wrappers/localize.ts'
import { MODULE_ID } from '../settings.ts'

export interface Pronouns {
  s: string // Subjective
  o: string // Objective
  pa: string // Possessive adjective
  pp: string // Possessive pronoun
}

const getPronouns = (gender: string): Pronouns => {
  const g = gender.toLowerCase() === 'feminine'
    ? 'feminine'
    : 'masculine' // The 18th century was a less enlightened time.
  const prefix = [MODULE_ID, 'pronouns', g]

  return {
    s: localize([...prefix, 'sub']),
    o: localize([...prefix, 'obj']),
    pa: localize([...prefix, 'pos', 'adj']),
    pp: localize([...prefix, 'pos', 'pro'])
  }
}

export default getPronouns
