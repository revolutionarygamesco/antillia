import getPronouns, { type Pronouns } from './get-pronouns.ts'

export interface Gender extends Pronouns {
  naming: 'Masculine' | 'Feminine'
}

export const feminine: Gender = { naming: 'Feminine', ...getPronouns('Feminine') }
export const masculine: Gender = { naming: 'Masculine', ...getPronouns('Masculine') }
