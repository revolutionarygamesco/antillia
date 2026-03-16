import type { DoomedShip } from '../types.ts'
import { pickRandomEmpire } from '../../empires.ts'
import getCrew from './crew.ts'
import getHandwriting from './handwriting.ts'
import getRequesters from './requesters.ts'
import getKin from './kin.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import situations from './situations.ts'

const getDoomedSituation = async (): Promise<DoomedShip> => {
  const roll6 = stockArray([{ n: 1, item: true }, { n: 5, item: false }])
  const situation = selectRandomElement(stockArray([
    { n: 1, item: situations.davy },
    { n: 1, item: situations.kraken },
    { n: 1, item: situations.whale },
    { n: 1, item: situations.orcas },
    { n: 10, item: situations.scourge },
    { n: 10, item: situations.ghosts },
    { n: 10, item: situations.deep },
    { n: 1, item: situations.metamorphosis },
    { n: 1, item: situations.haunted },
    { n: 50, item: situations.disease },
    { n: 5, item: situations.cannibalism },
    { n: 5, item: situations.sacrifice },
    { n: 10, item: situations.drinking },
    { n: 10, item: situations.meat },
    { n: 50, item: situations.lost },
    { n: 50, item: situations.reef },
    { n: 25, item: situations.infestation },
    { n: 25, item: situations.battle },
    { n: 50, item: situations.storm }
  ]))

  const empire = pickRandomEmpire()
  const { ship, captain, author } = await getCrew(empire)
  const requesters = await getRequesters(author, empire)
  const kin = await getKin(requesters, empire)

  return {
    ship,
    captain,
    author,
    handwriting: getHandwriting(),
    tale: situation.tag,
    complication: selectRandomElement(situation.complications),
    isHaunted: selectRandomElement(roll6),
    includeMap: selectRandomElement(roll6),
    kin
  }
}

export default getDoomedSituation
