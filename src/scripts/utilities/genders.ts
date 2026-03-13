import getPronouns, { type Pronouns } from './get-pronouns.ts'

export interface Gender extends Pronouns {
  naming: 'Masculine' | 'Feminine'
}

const getGenders = (): { masculine: Gender, feminine: Gender } => {
  const feminine: Gender = { naming: 'Feminine', ...getPronouns('Feminine') }
  const masculine: Gender = { naming: 'Masculine', ...getPronouns('Masculine') }
  return { masculine, feminine }
}

export default getGenders
