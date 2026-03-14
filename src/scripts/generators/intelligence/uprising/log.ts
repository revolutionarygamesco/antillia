import { type UprisingStoryline } from './types.ts'
import addLog from '../../../log/add.ts'
import makeLink from '../../../utilities/make-link.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const logUprising = async (
  uprising: UprisingStoryline,
  island: JournalEntry,
  response: string,
  ship?: Actor
): Promise<void> => {
  const context: Record<string, any> = { island: makeLink(island), response }
  if (ship) context.ship = makeLink(ship)
  const text = localize([MODULE_ID, 'log', 'events', 'uprising', uprising.tag], context)
  await addLog(text, uprising, uprising.at)
}

export default logUprising
