import type { DoomedShip } from '../types.ts'
import getContext from '../context/get.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import renderTale from '../render/tale.ts'
import renderRequest from '../render/request.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generateDoomedMessageItem = async (
  at: number,
  situation: DoomedShip
): Promise<Item> => {
  const prefix = [MODULE_ID, 'last-accounts', 'item']
  const context = await getContext(at, situation)

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
