import AdventureState from '../../../state/adventure/class.ts'
import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import decapitalize from '../../../utilities/decapital.ts'
import fromUuid from '../../../utilities/wrappers/from-uuid.ts'
import generateReportAge from '../shared-data/age.ts'
import getMonth from '../../../time/month.ts'
import getYear from '../../../time/year.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../../random/el.ts'
import drawFirst from '../../../utilities/draw-first.ts'
import makeLink from '../../../utilities/make-link.ts'
import empires from '../shared-data/empires.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const generatePirateReport = async (): Promise<BottleMessageIntel> => {
  const prefix = [MODULE_ID, 'intelligence', 'pirate']

  // Pick an empire.
  const e = selectRandomElement(Object.values(empires))
  const empire = decapitalize(localize([MODULE_ID, 'factions', e.tag, 'name']))
  const lang = localize([MODULE_ID, 'factions', e.tag, 'lang'])

  // When was the report written?
  const age = generateReportAge()
  const month = getMonth(age)
  const year = getYear(age)

  // Is it a PC?
  const state = await AdventureState.load()
  const uuids = Object.keys(state.exploits).filter(key => {
    const exploits = state.exploits.get(key)
    return exploits && exploits.check()
  })

  const actors: Actor[] = []
  for await (const uuid of uuids) {
    const actor = await fromUuid(uuid) as Actor | null
    if (actor) actors.push(actor)
  }

  let captain = actors.length > 0 ? selectRandomElement(actors) : null
  let name = captain?.name
  let link = captain ? makeLink(captain) : undefined

  if (!captain) {
    captain = await drawFirst(UUIDS.PIRATES)
    name = captain?.name
    link = captain ? makeLink(captain) : undefined
  }

  if (!captain) {
    name = localize([...prefix, 'fallback', 'name'])
    link = localize([...prefix, 'fallback', 'link'])
  }

  // What's the twist?
  const detailKey = selectRandomElement(['infiltrated', 'hostile',
    'unsurprising', 'secret', 'commercial', 'bad'])
  const detail = localize([...prefix, 'details', detailKey], { name, empire })

  // Write the report
  const title = localize([...prefix, 'title'], { name, month, year })
  const report = localize([...prefix, 'report'], { lang, month, year, link, detail })

  return { title, report }
}

export default generatePirateReport
