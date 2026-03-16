import type { DoomedShip } from '../types.ts'
import type { EmpireData } from '../../empires.ts'
import generateShip from '../../../utilities/generate-ship.ts'
import generatePersonalName from '../../../utilities/name.personal.ts'
import capitalize from '../../../utilities/capital.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'

const getCrew = async (
  empire: EmpireData
): Promise<Pick<DoomedShip, 'ship' | 'captain' | 'author'>> => {
  const set = { nationality: capitalize(empire.tag), use: 'Merchant', pirate: false }
  const { ship, captain, details } = await generateShip(set)

  const position = selectRandomElement(stockArray([
    { n: 1, item: 'captain' },
    { n: 1, item: 'bosun' },
    { n: 1, item: 'master' },
    { n: 1, item: 'purser' },
    { n: 5, item: 'sailor' },
    { n: 1, item: 'cook' }
  ]))

  const isCaptain = position === 'captain'

  const nationality = isCaptain ? details.captain.culture : selectRandomElement(empire.nationalities)
  const name = isCaptain ? captain.name : await generatePersonalName(nationality, 'Masculine')
  const author = { name, position, nationality }

  return { ship, captain, author }
}

export default getCrew
