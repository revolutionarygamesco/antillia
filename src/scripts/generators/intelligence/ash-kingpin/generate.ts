import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import { type AshKingpin, type AshKingpinStoryline } from './type.ts'
import addLog from '../../../log/add.ts'
import checkExistingKingpin from './check.ts'
import drawSettlement from '../../settlement.ts'
import generatePersonalName from '../../../utilities/name.personal.ts'
import getPronouns from '../../../utilities/get-pronouns.ts'
import generateReportAge from '../shared-data/age.ts'
import getDay from '../../../time/day.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { pickRandomEmpire } from '../../empires.ts'
import { MODULE_ID } from '../../../settings.ts'

const generateAshKingpinReport = async (): Promise<BottleMessageIntel> => {
  const prefix = [MODULE_ID, 'intelligence', 'ash-kingpin']

  // How old is this report?
  const at = generateReportAge() * (24 * 60 * 60)

  // Which empire filed this report?
  const empire = pickRandomEmpire()

  // What location are we talking about?
  const target = pickRandomEmpire()
  const location = await drawSettlement(target)

  // Is there already a kingpin there?
  const existing = await checkExistingKingpin(location.uuid)

  // If this is the first kingpin in this location, then she’s consolidating
  // power there for the first time. If not, there’s a story to figure out
  // about the transition of power.
  const successor = ['killed.coup', 'killed.succeed', 'captured.succeeded']
  const newKingpin = [...successor, 'consolidated']
  const vacuum = ['killed.vacuum', 'captured.vacuum']
  const detailsKey = existing === null || existing?.resident === null
    ? 'consolidated'
    : selectRandomElement([...successor, ...vacuum])

  // Who's the new kingpin?
  let resident: AshKingpin | null = null
  if (newKingpin.includes(detailsKey)) {
    // Pick a gender
    const options: Array<{ n: number, item: 'Masculine' | 'Feminine' }> = [{ n: 2, item: 'Masculine' }, { n: 1, item: 'Feminine' }]
    const gender = selectRandomElement(stockArray(options))

    // Generate a name
    const nationality = selectRandomElement(target.nationalities)
    const name = await generatePersonalName(nationality, gender)
    resident = { name, gender }
  }

  // Write to the log
  const payload: AshKingpinStoryline = { location: location.uuid, storyline: 'ash-kingpin', resident }
  await addLog('', payload, at)
  console.log('kingpin')

  // Generate the report
  const day= getDay(at)
  const lang = localize([MODULE_ID, 'factions', empire.tag, 'lang'])
  const base = { name: resident?.name, location: makeLink(location) }
  const context = existing?.resident
    ? { ...base, former: existing.resident.name, ...getPronouns(existing.resident.gender) }
    : base
  const details = localize([...prefix, 'details', detailsKey], context)

  const titleType = vacuum.includes(detailsKey) ? 'vacuum' : 'new'
  const title = localize([...prefix, 'title', titleType], { location: location.name })
  const report = localize([...prefix, 'report'], { lang, day, details })

  return { title, report }
}

export default generateAshKingpinReport
