import getDay from '../../time/day.ts'
import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import { type BottleMessageIntel } from './bottle-message-intel.ts'
import { MODULE_ID, UUIDS } from '../../settings.ts'

import generateRandomFortUpgradeReport from './fort-upgrades/generate.ts'
import generateRandomConvoySchedule from './convoys/generate.ts'
import generateCorruptionReport from './corruption/generate.ts'

const generateIntelligenceBottleMessage = async (): Promise<BottleMessage> => {
  const reporters: Array<() => Promise<BottleMessageIntel>> = [
    generateRandomConvoySchedule,
    generateRandomConvoySchedule,
    generateCorruptionReport,
    generateRandomFortUpgradeReport
  ]

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

  const encrypted= await foundry.documents.Item.create({
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

  return { contents: [encrypted] }
}

export default generateIntelligenceBottleMessage
