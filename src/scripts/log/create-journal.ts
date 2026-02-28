import getLog from './get.ts'
import getId from '../utilities/get-id.ts'
import localize from '../utilities/wrappers/localize.ts'
import LogEntry from './entry.ts'
import createChapter from './create-chapter.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const createLog = async (): Promise<JournalEntry> => {
  const existing = await getLog()
  if (existing) return existing

  const first = new LogEntry({ at: 0, text: localize([MODULE_ID, 'log', 'first']) })
  const ch1 = createChapter(1, first)
  return await foundry.documents.JournalEntry.create({
    _id: getId(UUIDS.LOG),
    name: localize([MODULE_ID, 'log', 'title']),
    folder: UUIDS.JOURNAL_ROOT,
    ownership: { default: 0 },
    pages: [ch1]
  }, { keepId: true })
}

export default createLog
