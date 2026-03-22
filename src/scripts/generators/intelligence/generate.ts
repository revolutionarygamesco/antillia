import checkVersion from '../../utilities/check-version.ts'
import getDay from '../../time/day.ts'
import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import { MODULE_ID, UUIDS } from '../../settings.ts'

import generateRandomFortUpgradeReport from './fort-upgrades/generate.ts'
import generateConvoySchedule from './convoys/report.ts'
import generateCorruptionReport from './corruption/generate.ts'
import generateSpyList from './spies/generate.ts'
import generatePirateReport from './pirate/generate.ts'
import generateAshKingpinReport from './ash-kingpin/generate.ts'
import reportOutbreak from './outbreak/report.ts'
import reportUprising from './uprising/report.ts'

const generateIntelligence = async (): Promise<Item> => {
  const reporters = stockArray([
    { n: 4, item: generateConvoySchedule },
    { n: 2, item: generateCorruptionReport },
    { n: 2, item: generateRandomFortUpgradeReport },
    { n: 2, item: generatePirateReport },
    { n: 2, item: reportOutbreak },
    { n: 1, item: generateSpyList },
    { n: 1, item: generateAshKingpinReport }
  ])

  const { historical } = await checkVersion()
  if (historical) reporters.push(reportUprising)

  const reporter = selectRandomElement(reporters)
  const { title, report } = await reporter()

  const date = getDay(game?.time?.worldTime ?? 0)
  const p: Record<string, string> = {
    recovered: localize([MODULE_ID, 'bottle-messages', 'recovered', 'base'], { date }),
    encrypted: localize([MODULE_ID, 'intelligence', 'encrypted', 'description']),
    link: localize([MODULE_ID, 'intelligence', 'encrypted', 'link']),
    decrypted: localize([MODULE_ID, 'intelligence', 'decrypted'])
  }

  const decrypted = await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: 'icons/sundries/documents/paper-plain-white.webp',
    folder: UUIDS.DECRYPTED_INTEL_MESSAGES,
    system: {
      description: p.recovered + p.decrypted + report,
      value: 0,
      carryWeight: 0
    },
    ownership: { default: 0 }
  })

  return await foundry.documents.Item.create({
    name: localize([MODULE_ID, 'intelligence', 'encrypted', 'name']),
    type: 'misc',
    img: 'icons/sundries/documents/paper-plain-white.webp',
    folder: UUIDS.ENCRYPTED_INTEL_MESSAGES,
    system: {
      description: p.recovered + p.encrypted + `<p>@UUID[${decrypted.uuid}]{${p.link}}</p>`,
      value: 0,
      carryWeight: 0
    },
    ownership: { default: 0 }
  })
}

export default generateIntelligence
