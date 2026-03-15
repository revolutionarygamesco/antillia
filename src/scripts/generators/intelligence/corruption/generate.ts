import decapitalize from '../../../utilities/decapital.ts'
import drawGovernor from '../../governor.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { pickRandomEmpire } from '../../empires.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import empires from '../../empires.ts'
import { MODULE_ID } from '../../../settings.ts'

const generateCorruptionReport = async (): Promise<{ title: string, report: string }> => {
  const empire = pickRandomEmpire()
  const governor = await drawGovernor(empire)

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

  const r = selectRandomElement(empire.others)
  const rival = decapitalize(localize([MODULE_ID, 'factions', r, 'name']))

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
