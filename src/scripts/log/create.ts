import getLog from './get.ts'
import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const getId = (uuid: string): string => {
  const elements = uuid.split('.')
  return elements.pop() ?? uuid
}

const createLog = async (): Promise<JournalEntry> => {
  const existing = await getLog()
  if (existing) return existing

  const first = localize([MODULE_ID, 'log', 'first'])
  return await foundry.documents.JournalEntry.create({
    _id: getId(UUIDS.LOG),
    name: localize([MODULE_ID, 'log', 'title']),
    folder: UUIDS.JOURNAL_ROOT,
    ownership: { default: 0 },
    pages: [
      {
        _id: getId(UUIDS.TIMELINE),
        name: localize([MODULE_ID, 'chapters', 'ch1']),
        type: 'text',
        title: { show: true, level: 1 },
        text: {
          format: 1,
          content: `<dl><dt data-at="0">DATE</dt><dd>${first}</dd></dl>`
        }
      }
    ]
  }, { keepId: true })
}

export default createLog
