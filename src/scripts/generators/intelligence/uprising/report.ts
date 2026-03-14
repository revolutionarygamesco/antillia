import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import { pickRandomEmpire } from '../../empires.ts'
import getTime from '../../../time/get.ts'
import generateReportAge from '../shared-data/age.ts'
import generateUprising from './generate.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import logUprising from './log.ts'
import selectRandomBetween from '../../../random/between.ts'
import reportSituation from './report.situation.ts'
import reportTwist from './report.twist.ts'
import reportResponse from './report.response.ts'
import { MODULE_ID, SECONDS_PER_DAY } from '../../../settings.ts'

const reportUprising = async (): Promise<BottleMessageIntel> => {
  const reporting = pickRandomEmpire()
  const lang = localize([MODULE_ID, 'factions', reporting.tag, 'lang'])

  const age = generateReportAge()
  const daysBefore = selectRandomBetween(3, 7)
  const at = getTime() - age - (daysBefore * SECONDS_PER_DAY)

  const { uprising, empire, island } = await generateUprising(at)
  const situation = await reportSituation(empire, island, uprising)
  const twist = reportTwist(uprising)
  const response = await reportResponse(island, uprising)

  await logUprising(uprising, island, response.log, situation.ship)

  const prefix = [MODULE_ID, 'intelligence', 'uprising']
  const title = localize([...prefix, 'title'], { island: island.name })
  const report = localize([...prefix, 'report'], { lang, situation: situation.intel, twist, response: response.intel })
  return { title, report }
}

export default reportUprising
