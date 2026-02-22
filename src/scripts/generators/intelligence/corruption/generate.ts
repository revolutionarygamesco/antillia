import drawFirst from '../../../utilities/draw-first.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const govJamaica: TableResult = {
  type: 'document',
  documentUuid: UUIDS.JOURNAL_GOVERNOR_JAMAICA,
  img: 'modules/revolutionary-pbshipgen/images/british.png',
  id: 'ONXX9spWG4QJwg06',
  name: 'The Governor of Jamaica'
} as TableResult

const flags: Record<string, string> = {
  spanish: 'modules/revolutionary-pbshipgen/images/spanish.png',
  british: 'modules/revolutionary-pbshipgen/images/british.png',
  french: 'modules/revolutionary-pbshipgen/images/french.png',
  dutch: 'modules/revolutionary-pbshipgen/images/dutch.png'
}

const generateCorruptionReport = async (): Promise<{ title: string, report: string }> => {
  const drawn = await drawFirst(UUIDS.GOVERNORS)
  const governor = drawn ?? govJamaica

  const c = selectRandomElement(['skimming', 'selling-offices',
    'embezzlement', 'ash', 'arms', 'privateers', 'pardons', 'probate',
    'illegal-trade', 'extortion-scourge', 'extortion-pirates', 'harboring',
    'imprisonment'])
  const ev = selectRandomElement(['solid', 'testimony', 'testimony',
    'hearsay', 'hearsay', 'hearsay'])
  const l = selectRandomElement(Object.keys(flags))
  const lang = localize([MODULE_ID, 'factions', l, 'lang'])

  const otherEmpires = Object.keys(flags)
    .filter(empire => flags[empire] !== governor.img)
  const empireCode = selectRandomElement(otherEmpires)
  const empire = localize([MODULE_ID, 'factions', empireCode, 'lang'])

  const prefix = [MODULE_ID, 'intelligence', 'corruption']
  const evidence = localize([...prefix, 'evidence', ev])
  const crime = localize([...prefix, 'crimes', c], {
    governor: makeLink(governor),
    evidence,
    empire
  })

  const title = localize([...prefix, 'title'], { governor: governor.name })
  const report = localize([...prefix, 'report'], { lang, crime })

  return { title, report }
}

export default generateCorruptionReport
