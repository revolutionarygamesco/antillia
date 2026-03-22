import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import decapitalize from '../../../utilities/decapital.ts'
import drawInfamousPirate from '../../pirate.ts'
import generateReportAge from '../shared-data/age.ts'
import getMonth from '../../../time/month.ts'
import getYear from '../../../time/year.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../../random/el.ts'
import makeLink from '../../../utilities/make-link.ts'
import empires from '../../empires.ts'
import { MODULE_ID } from '../../../settings.ts'

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

  // Who's the pirate?
  const pirate = await drawInfamousPirate()
  const name = pirate.name
  const link = makeLink(pirate)

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
