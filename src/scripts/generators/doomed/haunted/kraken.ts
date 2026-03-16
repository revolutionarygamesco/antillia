import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const addKrakenContext = (
  context: Record<string, string>,
  isPremium: boolean = false
): void => {
  const name = localize([MODULE_ID, 'last-accounts', 'item', 'tales', 'kraken', 'link'])
  const uuid = UUIDS.PREMIUM_KRAKEN
  context.kraken = isPremium ? makeLink({ name, uuid }) : name
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'kraken',
  adder: addKrakenContext
} as DoomedContextAdder
