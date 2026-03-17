import type { DoomedShip } from '../types.ts'
import addContext from '../context/add.ts'
import checkVersion from '../../../utilities/check-version.ts'
import getDay from '../../../time/day.ts'
import getGivenName from '../../../utilities/name.given.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import renderTale from '../render/tale.ts'
import renderRequest from '../render/request.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generateDoomedMessageItem = async (
  at: number,
  situation: DoomedShip
): Promise<Item> => {
  const prefix = [MODULE_ID, 'last-accounts', 'item']
  const { premium } = await checkVersion()
  const given = getGivenName(situation.author.name)
  const author = situation.author.position === 'captain'
    ? makeLink(situation.captain)
    : situation.author.name

  const context: Record<string, string> = {
    author,
    given,
    captain: makeLink(situation.captain),
    rank: situation.author.position,
    date: getDay(at),
    shipLink: makeLink(situation.ship),
    ship: situation.ship.name,
    ...situation.handwriting
  }

  await addContext(situation, context, premium)

  const tale = renderTale(context, situation)
  const complication = localize([...prefix, 'complications', situation.complication], context)
  const request = renderRequest(context, situation)

  const title = localize([...prefix, 'title'], { ship: situation.ship.name })
  const description = localize([...prefix, 'description'], { ...context, tale, complication, request })

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: 'icons/sundries/documents/paper-plain-white.webp',
    folder: UUIDS.DOOMED_MESSAGES,
    system: {
      description,
      value: 0,
      carryWeight: 0
    },
    ownership: { default: 0 }
  })
}

export default generateDoomedMessageItem
