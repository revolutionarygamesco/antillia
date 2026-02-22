import getDay from '../../../time/day.ts'
import getTime from '../../../time/get.ts'
import isNumber from '../../../utilities/guards/number.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import roll from '../../../utilities/roll.ts'
import routes, { type ConvoyRouteRef } from './routes.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import { MODULE_ID } from '../../../settings.ts'

const makeLinkFromRef = (ref: ConvoyRouteRef): string => {
  const name = localize(ref.name)
  return `@UUID[${ref.uuid}]{${name}}`
}

const generateRandomConvoySchedule = async (): Promise<BottleMessageIntel> => {
  const present = getTime()

  // How old is this intelligence?
  const fresh: [number, number] = [10, 30]
  const dated: [number, number] = [30, 90]
  const old: [number, number] = [90, 700]
  const brackets: Array<[number, number]> = [fresh, dated, dated, old, old, old]
  const bracket = selectRandomElement(brackets)
  const age = selectRandomBetween(...bracket)

  // And how far out was it predicting?
  const high: [number, number] = [60, 90]
  const mid: [number, number] = [30, 60]
  const low: [number, number] = [5, 30]
  const qualities: Array<[number, number]> = [high, mid, mid, low, low, low]
  const quality = selectRandomElement(qualities)
  const intel = selectRandomBetween(...quality)

  // So the convoy is leaving...
  const days = intel - age
  const seconds = present + (days * 24 * 60 * 60)
  const day = getDay(seconds)

  // Pick a route
  const route = selectRandomElement(routes)

  // Origin
  const o = selectRandomElement(route.origins)
  const origin = makeLinkFromRef(o)

  // Destination
  const d = selectRandomElement(route.dests)
  const dest = makeLinkFromRef(d)

  // Good being shipped
  const good = makeLinkFromRef(route.good)

  // Colors of the convoy
  const colors = localize([MODULE_ID, 'factions', route.empire, 'adj'])

  // Number of ships in the convoy
  const n = isNumber(route.ships)
    ? route.ships
    : Math.min(2, await roll(route.ships))
  const size = n < 21
    ? localize([MODULE_ID, 'numbers', n.toString()]).toLowerCase()
    : n.toString()

  // Number of escort ships
  const w = isNumber(route.escort)
    ? route.escort
    : Math.min(1, await roll(route.escort))
  const adjusted = Math.min(n, w)
  const escort = adjusted < 21
    ? localize([MODULE_ID, 'numbers', adjusted.toString()]).toLowerCase()
    : adjusted.toString()

  // Language the report is written in
  const empires = ['spanish', 'british', 'french', 'dutch']
  const lang = localize([MODULE_ID, 'factions', selectRandomElement(empires), 'lang'])

  const title = localize([MODULE_ID, 'intelligence', 'convoys', 'title'])
  const report = localize([MODULE_ID, 'intelligence', 'convoys', 'report'], {
    day, origin, dest, good, colors, size, escort, lang
  })

  return { title, report }
}

export default generateRandomConvoySchedule
