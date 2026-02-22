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
import checkVersion from '../../../utilities/check-version.ts'
import makeLink from '../../../utilities/make-link.ts'
import empires, { type EmpireData } from '../shared-data/empires.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const prefix = [MODULE_ID, 'intelligence', 'outbreak']

const contexts: Array<EmpireData> = [
  empires.spanish, empires.spanish, empires.spanish, empires.spanish, empires.spanish,
  empires.british, empires.british, empires.british, empires.british,
  empires.french, empires.french,
  empires.dutch
]

const situations: Array<{ tag: string, reactions: string[], twists: string[] }> = [
  {
    tag: 'early',
    reactions: ['ignore', 'ignore', 'ignore', 'prayer', 'fumigation', 'quarantine'],
    twists: ['faith-healer', 'doctor', 'witch-hunt']
  },
  {
    tag: 'mid',
    reactions: ['ignore', 'prayer', 'fumigation', 'fumigation', 'quarantine', 'quarantine', 'closure'],
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
  const fumigants = shuffleArray<string>(['sulphur', 'gunpowder', 'tar', 'tobacco', 'ash'])
    .slice(0, numFumigants)
  const mix = fumigants.includes('ash') ? 'volatile' : 'regular'
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

  const c = selectRandomElement(contexts)
  const result = await drawFirst(c.settlements) ?? { name: 'Kingston', uuid: UUIDS.JOURNAL_KINGSTON } as TableResult
  const settlement = makeLink(result)

  const namer = game?.modules?.get('revolutionary-piratenames')?.api
  const nationality = selectRandomElement(c.nationalities)
  const name = namer?.generateName
    ? await namer.generateName(nationality, 'Masculine')
    : 'John Doe'

  const d = await getRandomDisease()
  const disease = `@UUID[${d.uuid}]{${d.name}}`

  // How old is this intelligence?
  const fresh: [number, number] = [10, 30]
  const dated: [number, number] = [30, 90]
  const old: [number, number] = [90, 700]
  const brackets: Array<[number, number]> = [fresh, dated, dated, old, old, old]
  const bracket = selectRandomElement(brackets)
  const days = selectRandomBetween(...bracket)
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
