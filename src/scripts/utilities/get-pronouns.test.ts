import { MODULE_ID } from '../settings.ts'
import capitalize from './capital.ts'
import getPronouns from './get-pronouns.ts'

describe('getPronouns', () => {
  it.each(['masculine', 'feminine'])('returns %s pronouns', (gender) => {
    const { s, o, pa, pp } = getPronouns(gender)
    expect(s).toBe(`${MODULE_ID}.pronouns.${gender}.sub`)
    expect(o).toBe(`${MODULE_ID}.pronouns.${gender}.obj`)
    expect(pa).toBe(`${MODULE_ID}.pronouns.${gender}.pos.adj`)
    expect(pp).toBe(`${MODULE_ID}.pronouns.${gender}.pos.pro`)
    expect(S).toBe(`${capitalize(MODULE_ID)}.pronouns.${gender}.sub`)
    expect(O).toBe(`${capitalize(MODULE_ID)}.pronouns.${gender}.obj`)
    expect(PA).toBe(`${capitalize(MODULE_ID)}.pronouns.${gender}.pos.adj`)
    expect(PP).toBe(`${capitalize(MODULE_ID)}.pronouns.${gender}.pos.pro`)
  })
})
