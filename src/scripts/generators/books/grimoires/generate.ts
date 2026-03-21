import { type Grimoire, type GrimoireSpell, grimoireSchools } from './types.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import shuffleArray from '../../../random/shuffle.ts'
import rituals from './data.ts'

const generateGrimoire = (): Grimoire => {
  const school = selectRandomElement([...grimoireSchools])
  const description = selectRandomElement(rituals[school].descriptions)

  const [c1, c2] = rituals[school].categories
  const p1: GrimoireSpell[] = selectRandomBetween(1, 2) === 1
    ? [selectRandomElement(c1.spells)]
    : c1.spells
  const p2: GrimoireSpell[] = selectRandomBetween(1, 2) === 1
    ? [selectRandomElement(c2.spells)]
    : c2.spells
  const r = shuffleArray([...p1, ...p2])

  const adj = r[0].tag
  const occultist = r[1].tag

  return { school, description, rituals: r, adj, occultist }
}

export default generateGrimoire
