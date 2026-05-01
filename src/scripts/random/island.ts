import { type EmpireData, pickRandomEmpire } from './empires.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import drawFirst from '../utilities/draw-first.ts'
import { UUIDS } from '../settings.ts'

const drawIsland = async (
  empire?: EmpireData
): Promise<JournalEntry> => {
  const { islands } = empire ?? pickRandomEmpire()
  const drawn = await drawFirst(islands)
  return await fromUuid(drawn?.documentUuid ?? UUIDS.JOURNAL_JAMAICA)
}

export default drawIsland
