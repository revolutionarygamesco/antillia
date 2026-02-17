import { UUIDS } from '../../../settings.ts'
import fromUuid from '../../../utilities/wrappers/from-uuid.ts'
import makeLink from '../../../utilities/make-link.ts'

const selectFort = async (): Promise<string> => {
  const table = await fromUuid(UUIDS.FORTS) as RollTable
  if (!table.draw) return ''
  const drawn = await table.draw({ displayChat: false }) satisfies { results: TableResult[] }
  return makeLink(drawn.results[0])
}

export default selectFort
