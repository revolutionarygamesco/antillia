import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import drawFirst from '../../../utilities/draw-first.ts'
import getRandomDisease from '../../../random/disease.ts'
import getTime from '../../../time/get.ts'
import getMonth from '../../../time/month.ts'
import getYear from '../../../time/year.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../../random/el.ts'
import selectRandomBetween from '../../../random/between.ts'
import shuffleArray from '../../../random/shuffle.ts'
import stockArray from '../../../random/stock.ts'
import checkVersion from '../../../utilities/check-version.ts'
import makeLink from '../../../utilities/make-link.ts'
import generateReportAge from '../shared-data/age.ts'
import { pickRandomEmpire } from '../shared-data/empires.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const prefix = [MODULE_ID, 'intelligence', 'outbreak']

const situations: Array<{ tag: string, reactions: string[], twists: string[] }> = [
  {
    tag: 'early',
    reactions: stockArray([
      { n: 3, item: 'ignore' },
      { n: 1, item: 'prayer' },
      { n: 1, item: 'fumigation' },
      { n: 1, item: 'quarantine' }
    ]),
    twists: ['faith-healer', 'doctor', 'witch-hunt']
  },
  {
    tag: 'mid',
    reactions: stockArray([
      { n: 1, item: 'ignore' },
      { n: 1, item: 'prayer' },
      { n: 2, item: 'fumigation' },
      { n: 2, item: 'quarantine' },
      { n: 1, item: 'closure' }
    ]),
    twists: ['faith-healer', 'doctor', 'witch-hunt', 'price-gouging', 'authorities-fled', 'undefended']
  },
  {
    tag: 'late',
    reactions: ['prayer', 'fumigation', 'closure'],
    twists: ['faith-healer', 'doctor', 'witch-hunt', 'price-gouging', 'authorities-fled', 'undefended']
  }
]

const fumigate = (): string => {
  const numFumigants = selectRandomBetween(1, 3)
  const fumigants = shuffleArray<string>(['sulphur', 'gunpowder', 'tar', 'tobacco'])
    .slice(0, numFumigants)
  const isVolatile = selectRandomElement(stockArray([{ n: 1, item: true }, { n: 2, item: false }]))
  const mix = isVolatile ? 'volatile' : 'regular'
  const fumPrefix = [...prefix, 'fumigants']
  const n = numFumigants < 3 ? 'two' : 'three'

  const fumigant1 = localize([...fumPrefix, fumigants[0]])
  const fumigant2 = fumigants.length > 1
    ? localize([...fumPrefix, fumigants[1]])
    : null
  const fumigant3 = fumigants.length > 2
    ? localize([...fumPrefix, fumigants[2]])
    : null

  return numFumigants === 1
    ? fumigant1
    : localize([...fumPrefix, 'mix', mix, n], { fumigant1, fumigant2, fumigant3 })
}

const generateOutbreakReport = async (): Promise<BottleMessageIntel> => {
  const { historical } = await checkVersion()
  const fumigants = fumigate()

  const agent = selectRandomElement(['spanish', 'british', 'french', 'dutch'])
  const lang = localize([MODULE_ID, 'factions', agent, 'lang'])

  const { settlements, nationalities } = pickRandomEmpire()
  const result = await drawFirst(settlements) ?? { name: 'Kingston', uuid: UUIDS.JOURNAL_KINGSTON } as TableResult
  const settlement = makeLink(result)

  const namer = game?.modules?.get('revolutionary-piratenames')?.api
  const nationality = selectRandomElement(nationalities)
  const name = namer?.generateName
    ? await namer.generateName(nationality, 'Masculine')
    : 'John Doe'

  const d = await getRandomDisease()
  const disease = `@UUID[${d.uuid}]{${d.name}}`

  // How old is this intelligence?
  const days = generateReportAge()
  const present = getTime()
  const written = present - (days * 24 * 60 * 60)
  const month = getMonth(written)
  const year = getYear(written)

  const s = selectRandomElement(situations)
  const situation = localize([...prefix, 'situations', s.tag], { settlement, disease, month, year })

  const r = selectRandomElement(s.reactions)
  const reaction = localize([...prefix, 'reactions', r], { fumigants })

  const t = selectRandomElement(historical ? [...s.twists, 'slave'] : s.twists)
  const twist = localize([...prefix, 'twists', t], { name })

  const title = localize([...prefix, 'title'], { disease: d.name, settlement: result.name })
  const report = localize([...prefix, 'report'], { lang, situation, reaction, twist })

  return { title, report }
}

export default generateOutbreakReport
