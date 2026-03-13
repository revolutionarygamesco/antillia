import { type EmpireData, pickRandomEmpire } from './empires.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import drawFirst from '../utilities/draw-first.ts'
import { UUIDS } from '../settings.ts'

const drawSettlement = async (
  empire?: EmpireData
): Promise<JournalEntry> => {
  const { settlements } = empire ?? pickRandomEmpire()
  const drawn = await drawFirst(settlements)
  return await fromUuid(drawn?.documentUuid ?? UUIDS.JOURNAL_KINGSTON)
}

export default drawSettlement
