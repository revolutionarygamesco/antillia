import AdventureState from '../state/adventure/class.ts'
import getTime from '../time/get.ts'
import drawFirst from '../utilities/draw-first.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import { UUIDS } from '../settings.ts'

const diseaseTableUUIDs: Record<string, string> = {
  '1': UUIDS.DISEASES_EARLY,
  '2': UUIDS.DISEASES_EARLY,
  '3': UUIDS.DISEASES_MID,
  '4': UUIDS.DISEASES_MID,
  '5': UUIDS.DISEASES_LATE,
  '6': UUIDS.DISEASES_LATE,
}

const getRandomDisease = async (): Promise<JournalEntryPage> => {
  const state = await AdventureState.load()
  const chapter = state.getChapter(getTime())
  const uuid = diseaseTableUUIDs[chapter.n.toString()]
  const drawn = await drawFirst(uuid)
  return await fromUuid(drawn?.documentUuid ?? UUIDS.JOURNAL_YELLOW_JACK) as JournalEntryPage
}

export default getRandomDisease
