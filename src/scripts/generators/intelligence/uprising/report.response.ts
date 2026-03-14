import { type UprisingStoryline } from './types.ts'
import { lesserResponses } from './respond.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { MODULE_ID } from '../../../settings.ts'

const reportResponse = async (
  island: JournalEntry,
  uprising: UprisingStoryline
): Promise<{ intel: string, log: string }> => {
  const intelPath = [MODULE_ID, 'intelligence', 'uprising', 'responses', uprising.response]
  const logPath = [MODULE_ID, 'log', 'events', 'uprising', 'responses', uprising.response]
  if (lesserResponses.includes(uprising.response)) return { intel: localize(intelPath), log: localize(logPath) }

  const x = selectRandomElement(stockArray([
    { n: 3, item: 100 },
    { n: 2, item: 125 },
    { n: 1, item: 150 }
  ]))

  return {
    intel: localize(intelPath, { x, island: makeLink(island) }),
    log: localize(logPath, { x })
  }
}

export default reportResponse
