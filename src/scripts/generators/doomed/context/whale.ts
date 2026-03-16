import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const addBlackWhaleContext = (
  context: Record<string, string>,
  isPremium: boolean = false
): void => {
  const name = localize([MODULE_ID, 'last-accounts', 'item', 'tales', 'whale', 'link'])
  const uuid = UUIDS.PREMIUM_BLACK_WHALE
  context.kraken = isPremium ? makeLink({ name, uuid }) : name
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'whale',
  adder: addBlackWhaleContext
} as DoomedContextAdder
