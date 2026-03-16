import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import { pickRandomOutbreakDisease } from '../../intelligence/outbreak/diseases.ts'
import capitalize from '../../../utilities/capital.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID } from '../../../settings.ts'

const addDiseaseContext = async (
  context: Record<string, string>
): Promise<void> => {
  const disease = pickRandomOutbreakDisease()
  const name = capitalize(localize([MODULE_ID, 'intelligence', 'outbreak', 'diseases', disease.tag, 'sentence']))
  const uuid = disease.uuid
  context.kraken = makeLink({ name, uuid })
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'disease',
  adder: addDiseaseContext
} as DoomedContextAdder
