import { type BottleMessageIntel } from '../bottle-message-intel.ts'
import checkVersion from '../../../utilities/check-version.ts'
import drawFirst from '../../../utilities/draw-first.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import empires, { type EmpireData } from '../shared-data/empires.ts'
import {
  positions,
  rewards,
  baseCoercion,
  historicalCoercion,
  ego,
  ideology
} from './candidates.ts'
import {MODULE_ID} from '../../../settings.ts'

const pickElement = async (
  rival: EmpireData,
  key: 'governors' | 'forts' | 'ports'
): Promise<string> => {
  const result = await drawFirst(rival[key])
  if (!result) return ''
  return makeLink(result)
}

const generateSpyList = async (): Promise<BottleMessageIntel> => {
  // Pick an empire.
  const empire = selectRandomElement(Object.values(empires))
  const lang = localize([MODULE_ID, 'factions', empire.tag, 'lang'])

  // Pick a governor from that empire.
  const s = await drawFirst(empire.governors)
  const spymaster = s ? makeLink(s) : ''

  // How many spies?
  const n = selectRandomBetween(3, 6)
  const spies: string[] = []

  // Generate spies
  for (let i = 0; i < n; i++) {
    // Pick a rival empire
    const r = selectRandomElement(empire.others)
    const rival = empires[r]

    // Pick a position
    const p1 = selectRandomElement(positions)
    const p = Array.isArray(p1)
      ? selectRandomElement(p1)
      : p1

    // That position might need a governor, port, fort, or navy
    const governor = p.needs.includes('governor')
      ? await pickElement(rival, 'governors')
      : ''
    const port = p.needs.includes('port')
      ? await pickElement(rival, 'ports')
      : ''
    const fort = p.needs.includes('fort')
      ? await pickElement(rival, 'forts')
      : ''
    const navy = p.needs.includes('navy')
      ? localize([MODULE_ID, 'factions', rival.tag, 'navy'])
      : ''

    // Select a gender
    const gender = selectRandomElement(p.genders)

    // Get the position string
    const position = localize(p.path, { governor, port, fort, navy })

    // Compile possible motivations, part 1: There are certain coercion
    // motivations we need to skip if we're not in historical mode.
    const { historical } = await checkVersion()
    const coercion = historical
      ? [...baseCoercion, ...historicalCoercion]
      : baseCoercion

    // Compile possible motivations, part 2: Ideological motivations vary
    // depending on who we're spying on and who we're spying for.
    const ideological = ideology[rival.tag][empire.tag]

    // Compile possible motivations
    const motivationCategories: string[][][] = [rewards, ideological, coercion, ego]
    const motivationCategory: string[][] = selectRandomElement(motivationCategories)
    const motivationPath: string[] = selectRandomElement(motivationCategory)
    const motivation = localize(motivationPath, gender).trim()

    // Generate a name
    const namer = game?.modules?.get('revolutionary-piratenames')?.api
    const nationality = selectRandomElement(rival.nationalities)
    const name: string = namer?.generateName
      ? await namer.generateName(nationality, gender.naming)
      : 'John Doe'

    // Write our spy’s story
    spies.push(localize([MODULE_ID, 'intelligence', 'spies', 'listing'], {
      name, position, motivation
    }))
  }

  // Write the report
  const title = localize([MODULE_ID, 'intelligence', 'spies', 'title'], { spymaster: s?.name ?? '' })
  const report = localize([MODULE_ID, 'intelligence', 'spies', 'report'], {
    lang, spymaster, list: spies.map(spy => `<li>${spy}</li>`).join('')
  })

  return { title, report }
}

export default generateSpyList
