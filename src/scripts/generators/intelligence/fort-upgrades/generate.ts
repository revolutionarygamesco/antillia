import fromUuid from '../../../utilities/wrappers/from-uuid.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import checkVersion from '../../../utilities/check-version.ts'
import selectRandomElement from '../../../random/el.ts'
import writeFortUpgradeReport from './write.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generateRandomFortUpgradeReport = async (): Promise<{ title: string, report: string }> => {
  let fort: TableResult | null

  try {
    const table = await fromUuid(UUIDS.FORTS) as RollTable | null
    if (!table) throw new Error('Unable to find forts table')
    const drawn = await table.draw({ displayChat: false })
    if (!drawn) throw new Error('Could not draw from forts table')
    fort = drawn.results[0] as TableResult
  } catch (_err) {
    fort = { type: 'document', documentUuid: UUIDS.JOURNAL_FORT_CHARLES, name: 'Fort Charles' } as TableResult
  }

  const path = [MODULE_ID, 'intelligence', 'fort-upgrades']
  const upgrade = selectRandomElement(['tunnels', 'expansion', 'armor', 'undead'])
  const { premium } = await checkVersion()
  const report = writeFortUpgradeReport(fort, upgrade, premium)
  const mechanics = localize([...path, 'mechanics', upgrade])

  return {
    title: localize([...path, 'title'], { fort: fort.name }),
    report: `<blockquote>${report}</blockquote>${mechanics}`
  }
}

export default generateRandomFortUpgradeReport
