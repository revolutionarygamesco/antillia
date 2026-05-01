import type { EmpireData } from '../../../random/empires.ts'
import type { DoomedSailor } from '../types.ts'
import generatePersonalName from '../../../utilities/name.personal.ts'
import selectRandomBetween from '../../../random/between.ts'
import shuffleArray from '../../../random/shuffle.ts'
import stockArray from '../../../random/stock.ts'
import selectRandomElement from '../../../random/el.ts'

const getRequesters = async (
  author: DoomedSailor,
  empire: EmpireData,
  complication: string
): Promise<DoomedSailor[]> => {
  const n = selectRandomBetween(2, 5)

  const sailor = shuffleArray(stockArray([
    { n: 1, item: 'captain' },
    { n: 1, item: 'bosun' },
    { n: 1, item: 'master' },
    { n: 1, item: 'purser' },
    { n: 20, item: 'sailor' },
    { n: 1, item: 'cook' }
  ])).slice(0, n)

  const officer = shuffleArray(stockArray([
    { n: 1, item: 'captain' },
    { n: 1, item: 'bosun' },
    { n: 1, item: 'master' },
    { n: 1, item: 'purser' },
    { n: 5, item: 'sailor' },
    { n: 1, item: 'cook' }
  ])).slice(0, n)

  const requesters: DoomedSailor[] = [author]
  const officers = ['captain', 'bosun', 'master', 'purser']
  let pool = officers.includes(author.position) ? officer : sailor

  const removePositions = [
    { tag: 'mutiny', position: 'captain' }
  ]

  for (const { tag, position } of removePositions) {
    if (complication === tag) pool = pool.filter(p => p !== position)
  }

  const ranks = author.position !== 'sailor'
    ? pool.filter(rank => rank !== author.position)
    : pool

  for await (const position of ranks) {
    const nationality = selectRandomElement(empire.nationalities)
    const name = await generatePersonalName(nationality, 'Masculine')
    requesters.push({ name, position, nationality })
  }

  return requesters
}

export default getRequesters
