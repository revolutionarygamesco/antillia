import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const addHauntedContext = (
  context: Record<string, string>
): void => {
  const name = localize([MODULE_ID, 'last-accounts', 'description', 'haunted', 'spirit'])
  const uuid = UUIDS.ACTOR_WANDERING_SPIRIT
  context.spirit = makeLink({ name, uuid })
}

export default {
  test: (scenario: DoomedShip) => scenario.isHaunted,
  adder: addHauntedContext
} as DoomedContextAdder
