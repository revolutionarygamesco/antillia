import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const addCarrionContext = async (
  context: Record<string, string>,
  isPremium: boolean = false
): Promise<void> => {
  const name = localize([MODULE_ID, 'last-accounts', 'item', 'complications', 'carrion', 'link'])
  const uuid = UUIDS.PREMIUM_CARRION_GULL
  context.gulls = isPremium ? makeLink({ name, uuid }) : name
}

export default {
  test: (scenario: DoomedShip) => scenario.complication === 'carrion',
  adder: addCarrionContext
} as DoomedContextAdder
