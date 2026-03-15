import { type EmpireData, pickRandomEmpire } from './empires.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import drawFirst from '../utilities/draw-first.ts'
import { UUIDS } from '../settings.ts'

const drawGovernor = async (
  empire?: EmpireData
): Promise<JournalEntry> => {
  const { governors } = empire ?? pickRandomEmpire()
  const drawn = await drawFirst(governors)
  return await fromUuid(drawn?.documentUuid ?? UUIDS.JOURNAL_GOVERNOR_JAMAICA)
}

export default drawGovernor
