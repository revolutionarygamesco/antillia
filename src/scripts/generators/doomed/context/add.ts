import type { DoomedShip, DoomedContextAdder } from '../types.ts'
import name from './name.ts'
import battle from './battle.ts'
import carrion from './carrion.ts'
import davy from './davy.ts'
import disease from './disease.ts'
import haunted from './haunted.ts'
import kraken from './kraken.ts'
import orcas from './orcas.ts'
import sacrifice from './sacrifice.ts'
import whale from './whale.ts'

const addContext = async (
  scenario: DoomedShip,
  context: Record<string, string>,
  isPremium: boolean = false
): Promise<void> => {
  name(context, scenario)
  const adders: DoomedContextAdder[] = [battle, carrion, davy, disease,
    haunted, kraken, orcas, sacrifice, whale]

  for await (const { test, adder } of adders) {
    if (test(scenario)) await adder(context, isPremium)
  }
}

export default addContext
