import type { DoomedShip } from '../types.ts'
import checkVersion from '../../../utilities/check-version.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import getDay from '../../../time/day.ts'
import addContext from './add.ts'
import { MODULE_ID } from '../../../settings.ts'

const getContext = async (
  at: number,
  situation: DoomedShip
): Promise<Record<string, string>> => {
  const { premium } = await checkVersion()

  const context: Record<string, string> = {
    captain: makeLink(situation.captain),
    rank: localize([MODULE_ID, 'last-accounts', 'ranks', situation.author.position]),
    date: getDay(at),
    shipLink: makeLink(situation.ship),
    ship: situation.ship.name,
    ...situation.handwriting
  }

  await addContext(situation, context, premium)

  return context
}

export default getContext
