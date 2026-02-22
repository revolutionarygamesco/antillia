import drawFirst from '../../../utilities/draw-first.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import empires from '../shared-data/empires.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const govJamaica: TableResult = {
  type: 'document',
  documentUuid: UUIDS.JOURNAL_GOVERNOR_JAMAICA,
  img: 'modules/revolutionary-pbshipgen/images/british.png',
  id: 'ONXX9spWG4QJwg06',
  name: 'The Governor of Jamaica'
} as TableResult

const generateCorruptionReport = async (): Promise<{ title: string, report: string }> => {
  const drawn = await drawFirst(UUIDS.GOVERNORS)
  const governor = drawn ?? govJamaica

  const c = selectRandomElement(['skimming', 'selling-offices',
    'embezzlement', 'ash', 'arms', 'privateers', 'pardons', 'probate',
    'illegal-trade', 'extortion-scourge', 'extortion-pirates', 'harboring',
    'imprisonment'])
  const ev = selectRandomElement(stockArray([
    { n: 1, item: 'solid' },
    { n: 2, item: 'testimony' },
    { n: 3, item: 'hearsay' }
  ]))
  const l = selectRandomElement(Object.keys(empires))
  const lang = localize([MODULE_ID, 'factions', l, 'lang'])

  const otherEmpires = Object.values(empires)
    .filter(empire => empire.flag !== governor.img)
  const r = selectRandomElement(otherEmpires)
  const rival = localize([MODULE_ID, 'factions', r.tag, 'lang'])

  const prefix = [MODULE_ID, 'intelligence', 'corruption']
  const evidence = localize([...prefix, 'evidence', ev])
  const crime = localize([...prefix, 'crimes', c], {
    governor: makeLink(governor),
    evidence,
    rival
  })

  const title = localize([...prefix, 'title'], { governor: governor.name })
  const report = localize([...prefix, 'report'], { lang, crime })

  return { title, report }
}

export default generateCorruptionReport
