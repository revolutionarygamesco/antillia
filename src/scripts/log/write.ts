import AdventureState from '../state/adventure/class.ts'
import LogEntry from './entry.ts'
import getId from '../utilities/get-id.ts'
import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const chapterUUIDs: Record<number, string> = {
  1: getId(UUIDS.TIMELINE_CH1),
  2: getId(UUIDS.TIMELINE_CH2),
  3: getId(UUIDS.TIMELINE_CH3),
  4: getId(UUIDS.TIMELINE_CH4),
  5: getId(UUIDS.TIMELINE_CH5),
  6: getId(UUIDS.TIMELINE_CH6)
}

const writeLog = async (
  ...entries: LogEntry[]
): Promise<JournalEntry | null> => {
  const state = await AdventureState.load()
  const chapters = [1, 2, 3, 4, 5, 6]

  const pages: Array<Partial<JournalEntryPage>> = chapters.map(chapter => {
    const markup = entries
      .filter(entry => state.getChapter(entry.at).n === chapter)
      .map(entry => entry.html)

    if (markup.length < 1) return null

    return {
      id: getId(chapterUUIDs[chapter]),
      name: localize([MODULE_ID, 'chapters', `ch${chapter}`]),
      type: 'text',
      title: { show: true, level: 1 },
      text: {
        format: 1,
        content: `<dl>${markup.join('\n')}</dl>`
      }
    }
  }).filter(page => page !== null)

  return await foundry.documents.JournalEntry.create({
    _id: getId(UUIDS.LOG),
    name: localize([MODULE_ID, 'log', 'title']),
    folder: UUIDS.JOURNAL_ROOT,
    ownership: { default: 0 },
    pages
  }, { keepId: true })
}

export default writeLog
