import getId from '../utilities/get-id.ts'
import LogEntry from './entry.ts'
import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const ids: Record<string, string> = {
  '1': getId(UUIDS.TIMELINE_CH1),
  '2': getId(UUIDS.TIMELINE_CH2),
  '3': getId(UUIDS.TIMELINE_CH3),
  '4': getId(UUIDS.TIMELINE_CH4),
  '5': getId(UUIDS.TIMELINE_CH5),
  '6': getId(UUIDS.TIMELINE_CH6)
}

const createLogChapter = (
  num: number,
  ...entries: LogEntry[]
): Partial<JournalEntryPage> => {
  return {
    id: ids[num.toString()],
    name: localize([MODULE_ID, 'chapters', `ch${num}`]),
    type: 'text',
    title: { show: true, level: 1 },
    text: {
      format: 1,
      content: `<dl>${entries.map(entry => entry.html).join('')}</dl>`
    }
  }
}

export default createLogChapter
