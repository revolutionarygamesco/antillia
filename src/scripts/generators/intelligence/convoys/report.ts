import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import type { ConvoyRouteRef } from './types.ts'
import getDay from '../../../time/day.ts'
import getTime from '../../../time/get.ts'
import generateRandomConvoy from './generate.ts'
import generateReportAge from '../shared-data/age.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const makeLinkFromRef = (ref: ConvoyRouteRef): string => {
  const name = localize(ref.name)
  return `@UUID[${ref.uuid}]{${name}}`
}

const generateConvoySchedule = async (): Promise<BottleMessageIntel> => {
  const present = getTime()

  // How old is this intelligence?
  const age = generateReportAge()

  // And how far out was it predicting?
  const high: [number, number] = [60, 90]
  const mid: [number, number] = [30, 60]
  const low: [number, number] = [5, 30]
  const intel = selectRandomBetween(...selectRandomElement(stockArray([
    { n: 1, item: high },
    { n: 2, item: mid },
    { n: 3, item: low }
  ])))

  // So the convoy is leaving...
  const days = intel - age
  const departure = present + (days * 24 * 60 * 60)
  const day = getDay(departure)

  // Generate the convoy
  const convoy = await generateRandomConvoy(departure)
  const origin = makeLinkFromRef(convoy.origin)
  const dest = makeLinkFromRef(convoy.dest)
  const good = makeLink(convoy.good)
  const colors = localize([MODULE_ID, 'factions', convoy.empire.tag, 'adj'])

  const n = convoy.ships.length
  const size = n < 21
    ? localize([MODULE_ID, 'numbers', n.toString()]).toLowerCase()
    : n.toString()
  const ships = convoy.ships
    .map(ship => `<li>${makeLink(ship)}</li>`)
    .join('\n')

  const w = convoy.escort.length
  const escort = w < 21
    ? localize([MODULE_ID, 'numbers', w.toString()]).toLowerCase()
    : w.toString()
  const escortShips = convoy.escort
    .map(ship => `<li>${makeLink(ship)}</li>`)
    .join('\n')

  // Language the report is written in
  const empires = ['spanish', 'british', 'french', 'dutch']
  const lang = localize([MODULE_ID, 'factions', selectRandomElement(empires), 'lang'])

  const title = localize([MODULE_ID, 'intelligence', 'convoys', 'title'])
  const report = localize([MODULE_ID, 'intelligence', 'convoys', 'report'], {
    day, origin, dest, good, colors, size, escort, lang, ships, escortShips
  })

  return { title, report }
}

export default generateConvoySchedule
