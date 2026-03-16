import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { MODULE_ID } from '../../../settings.ts'

const addSacrificeContext = async (
  context: Record<string, string>
): Promise<void> => {
  const tag = selectRandomElement(stockArray([
    { n: 21, item: 'devil' },
    { n: 7, item: 'davy' },
    { n: 2, item: 'thor' },
    { n: 1, item: 'aegir' },
    { n: 2, item: 'odin' },
    { n: 1, item: 'njordr' },
    { n: 3, item: 'neptune' },
    { n: 3, item: 'poseidon' },
    { n: 2, item: 'manannan' }
  ]))

  context.god = localize([MODULE_ID, 'last-accounts', 'item', 'tales', 'sacrifice', 'gods', tag])
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'sacrifice',
  adder: addSacrificeContext
} as DoomedContextAdder
