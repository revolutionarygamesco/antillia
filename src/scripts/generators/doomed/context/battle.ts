import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'
import drawFirst from '../../../utilities/draw-first.ts'

const addBattleContext = async (
  context: Record<string, string>
): Promise<void> => {
  let infamous = selectRandomElement([true, false])

  const disregard = [
    'JournalEntry.nyMxqiH0g6beBO54', // Henry Jennings (has a mission)
    'JournalEntry.a3J09hGT8MU3nH5e', // Daniel Porter (“Private Pirate”)
    'JournalEntry.WRBU9kYTri0utC66', // Edward Miller (“Private Pirate”)
    'JournalEntry.V4DrDrIhfidDXUgP', // William Fox (“Private Pirate”)
    'JournalEntry.fWNxmkXPVz9XMbBi', // Edward England (too kind)
    'JournalEntry.CDMWmd3uiWuQnob6', // Benjamin Lay (has a mission)
    'JournalEntry.ZkaaBjvcUd4bJla2', // “Black Sam” Bellamy (too kind)
    'JournalEntry.huLPfjIcp3HkhUgT' // John Julian (has a mission)
  ]

  const captain = await drawFirst(UUIDS.PIRATES)
  if (disregard.includes(captain?.documentUuid ?? '')) infamous = false
  context.pirates = infamous && captain
    ? makeLink(captain)
    : localize([MODULE_ID, 'last-accounts', 'item', 'tales', 'battle', 'nameless'])
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'battle',
  adder: addBattleContext
} as DoomedContextAdder
