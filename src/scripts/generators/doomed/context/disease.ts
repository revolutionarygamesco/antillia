import type { DoomedContextAdder, DoomedShip } from '../types.ts'
import AdventureState from '../../../state/adventure/class.ts'
import capitalize from '../../../utilities/capital.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const addDiseaseContext = async (
  context: Record<string, string>
): Promise<void> => {
  const { chapter } = await AdventureState.load()
  const disease = selectRandomElement(stockArray([
    { n: 1, item: { tag: 'yellow', uuid: UUIDS.JOURNAL_YELLOW_JACK } },
    { n: 1, item: { tag: 'malaria', uuid: UUIDS.JOURNAL_MALARIA } },
    { n: 1, item: { tag: 'dysentery', uuid: UUIDS.JOURNAL_FLUX } },
    { n: 1, item: { tag: 'smallpox', uuid: UUIDS.JOURNAL_POX } },
    { n: 1, item: { tag: 'measles', uuid: UUIDS.JOURNAL_MEASLES } },
    { n: 1, item: { tag: 'influenza', uuid: UUIDS.JOURNAL_GRIPPE } },
    { n: 1, item: { tag: 'whooping', uuid: UUIDS.JOURNAL_COUGH } },
    { n: 1, item: { tag: 'diptheria', uuid: UUIDS.JOURNAL_BOULOGNE } },
    { n: 1, item: { tag: 'yaws', uuid: UUIDS.JOURNAL_YAWS } },
    { n: chapter, item: { tag: 'red', uuid: UUIDS.JOURNAL_RED } }
  ]))

  const name = capitalize(localize([MODULE_ID, 'last-accounts', 'item', 'tales', 'disease', 'diseases', disease.tag]))
  const uuid = disease.uuid
  context.disease = makeLink({ name, uuid })
}

export default {
  test: (scenario: DoomedShip) => scenario.tale === 'disease',
  adder: addDiseaseContext
} as DoomedContextAdder
