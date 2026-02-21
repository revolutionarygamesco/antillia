import localize from '../../../utilities/wrappers/localize.ts'
import checkVersion from '../../../utilities/check-version.ts'
import selectRandomElement from '../../../random/el.ts'
import drawFirst from '../../../utilities/draw-first.ts'
import getImperialLanguage from '../imperial-language.ts'
import writeFortUpgradeReport from './write.ts'
import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generateRandomFortUpgradeReport = async (): Promise<BottleMessageIntel> => {
  let fort = await drawFirst(UUIDS.FORTS)
  if (!fort) fort = { type: 'document', documentUuid: UUIDS.JOURNAL_FORT_CHARLES, name: 'Fort Charles' } as TableResult

  let empire = await drawFirst(UUIDS.EMPIRES)
  if (!empire) empire = { type: 'text', name: localize([MODULE_ID, 'factions', 'spanish', 'name']) } as TableResult

  const lang = getImperialLanguage(empire)
  const path = [MODULE_ID, 'intelligence', 'fort-upgrades']
  const upgrade = selectRandomElement(['tunnels', 'expansion', 'armor', 'undead'])
  const { premium } = await checkVersion()
  const report = writeFortUpgradeReport(fort, upgrade, lang, premium)

  return {
    title: localize([...path, 'title'], { fort: fort.name }),
    report
  }
}

export default generateRandomFortUpgradeReport
