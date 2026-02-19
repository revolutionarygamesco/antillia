import localize from '../../../utilities/wrappers/localize.ts'
import checkVersion from '../../../utilities/check-version.ts'
import selectRandomElement from '../../../random/el.ts'
import writeFortUpgradeReport from './write.ts'
import drawFirst from '../../../utilities/draw-first.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generateRandomFortUpgradeReport = async (): Promise<{ title: string, report: string }> => {
  let fort = await drawFirst(UUIDS.FORTS)
  if (!fort) fort = { type: 'document', documentUuid: UUIDS.JOURNAL_FORT_CHARLES, name: 'Fort Charles' } as TableResult

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
