import LogEntry from './entry.ts'
import localize from '../utilities/wrappers/localize.ts'
import getLog from './get.ts'
import writeLog from './write.ts'
import { MODULE_ID } from '../settings.ts'

const initLog = async (): Promise<JournalEntry | null> => {
  const existing = await getLog()
  if (existing) return existing

  return await writeLog(new LogEntry({
    at: 0,
    text: localize([MODULE_ID, 'log', 'first'])
  }))
}

export default initLog
