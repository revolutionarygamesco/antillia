import type { UprisingStoryline } from './types.ts'
import type { EmpireData } from '../../empires.ts'
import capitalize from '../../../utilities/capital.ts'
import getDay from '../../../time/day.ts'
import generateShip from '../../../utilities/generate-ship.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomBetween from '../../../random/between.ts'
import { MODULE_ID, SECONDS_PER_DAY } from '../../../settings.ts'

const reportSituation = async (
  empire: EmpireData,
  island: JournalEntry,
  uprising: UprisingStoryline
): Promise<{ intel: string, ship?: Actor }> => {
  const context: Record<string, any> = { day: getDay(uprising.at), island: makeLink(island) }

  let ship: Actor | undefined = undefined
  const involvesShip = ['sea', 'transfer']
  if (involvesShip.includes(uprising.tag)) {
    const result = await generateShip({
      nationality: capitalize(empire.tag),
      type: 'Frigate'
    })
    ship = result.ship
    context.ship = makeLink(ship)
  }

  if (uprising.tag === 'sea') {
    const daysBefore = selectRandomBetween(3, 7)
    const time = uprising.at - (daysBefore * SECONDS_PER_DAY)
    context.uprising = getDay(time)
  }

  const intel = localize([MODULE_ID, 'intelligence', 'uprising', 'situations', uprising.tag], context)
  return { intel, ship }
}

export default reportSituation
