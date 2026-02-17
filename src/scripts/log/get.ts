import fromUuid from '../utilities/wrappers/from-uuid.ts'
import { UUIDS } from '../settings.ts'

const getLog = async (): Promise<JournalEntry | null> => {
  try {
    return await fromUuid(UUIDS.LOG)
  } catch (_err) { return null }
}

export default getLog
