import { type OutbreakSituation } from './types.ts'
import addLog from '../../../log/add.ts'
import makeLink from '../../../utilities/make-link.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import capitalize from '../../../utilities/capital.ts'
import { MODULE_ID } from '../../../settings.ts'

const logOutbreak = async (
  situation: OutbreakSituation,
  settlement: JournalEntry,
  reaction: string
): Promise<void> => {
  const disease = localize([MODULE_ID, 'intelligence', 'outbreak', 'diseases', situation.disease.tag])
  const text = localize([MODULE_ID, 'log', 'events', 'outbreak'], {
    disease: `@UUID[${situation.disease.uuid}]{${capitalize(disease)}}`,
    location: makeLink(settlement),
    reaction
  })

  await addLog(text, situation, situation.course.mid[0])
}

export default logOutbreak
