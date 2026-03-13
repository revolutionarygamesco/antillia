import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import { type OutbreakStage } from './types.ts'
import { pickRandomEmpire } from '../../empires.ts'
import generateOutbreak from './generate.ts'
import calculateOnset from './onset.ts'
import setCourse from './course.ts'
import fumigate from './fumigate.ts'
import logOutbreak from './log.ts'
import generateReportAge from '../shared-data/age.ts'
import getMonth from '../../../time/month.ts'
import getYear from '../../../time/year.ts'
import fromUuid from '../../../utilities/wrappers/from-uuid.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { MODULE_ID, SECONDS_PER_DAY } from '../../../settings.ts'

const reportOutbreak = async (): Promise<BottleMessageIntel> => {
  const prefix = [MODULE_ID, 'intelligence', 'outbreak']

  const reporter = pickRandomEmpire()
  const lang = localize([MODULE_ID, 'factions', reporter.tag, 'lang'])

  const situation = await generateOutbreak()
  const { fumigation: fumigants } = fumigate()
  const { disease, reaction } = situation

  const diseaseName = localize([...prefix, 'diseases', disease.tag, 'sentence'])
  const diseaseTitle = localize([...prefix, 'diseases', disease.tag, 'title'])
  const diseaseLink = `@UUID[${disease.uuid}]{${diseaseName}}`

  const settlement = await fromUuid(situation.location) as JournalEntry
  const settlementName = settlement.name
  const settlementLink = makeLink(settlement)

  const stage: OutbreakStage = selectRandomElement(stockArray([
    { n: 2, item: 'mid' },
    { n: 1, item: 'early' }
  ]))

  const age = generateReportAge() * SECONDS_PER_DAY
  const now = game?.time?.worldTime ?? 0
  const relative = now - age
  const onset = calculateOnset(disease, relative, stage, reaction)
  situation.course = setCourse(onset, disease, reaction)

  const month = getMonth(relative)
  const year = getYear(relative)

  const s = localize([...prefix, 'situations', stage], {
    disease: diseaseLink,
    settlement: settlementLink,
    month,
    year
  })

  const r = localize([...prefix, 'reactions', reaction.tag], { fumigants })

  await logOutbreak(situation, settlement, r)

  const title = localize([...prefix, 'title'], {
    disease: diseaseTitle,
    settlement: settlementName
  })

  const report = localize([...prefix, 'report'], {
    lang,
    situation: s,
    reaction: r
  })

  return { title, report }
}

export default reportOutbreak
