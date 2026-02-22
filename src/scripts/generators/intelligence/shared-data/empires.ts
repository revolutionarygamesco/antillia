import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import { UUIDS } from '../../../settings.ts'

export interface EmpireData {
  tag: string
  flag: string
  nationalities: string[]
  others: string[]
  forts: string
  governors: string
  ports: string
  settlements: string
}

const empires: Record<string, EmpireData> = {
  spanish: {
    tag: 'spanish',
    flag: 'modules/revolutionary-pbshipgen/images/spanish.png',
    nationalities: ['Spanish'],
    others: ['british', 'french', 'dutch'],
    forts: UUIDS.FORTS_SPANISH,
    governors: UUIDS.GOVERNORS_SPANISH,
    ports: UUIDS.PORTS_SPANISH,
    settlements: UUIDS.SETTLEMENTS_SPANISH
  },
  british: {
    tag: 'british',
    flag: 'modules/revolutionary-pbshipgen/images/british.png',
    nationalities: ['English', 'English', 'English', 'Welsh', 'Scottish', 'Irish'],
    others: ['spanish', 'french', 'dutch'],
    forts: UUIDS.FORTS_BRITISH,
    governors: UUIDS.GOVERNORS_BRITISH,
    ports: UUIDS.PORTS_BRITISH,
    settlements: UUIDS.SETTLEMENTS_BRITISH
  },
  french: {
    tag: 'french',
    flag: 'modules/revolutionary-pbshipgen/images/french.png',
    nationalities: ['French'],
    others: ['spanish', 'british', 'dutch'],
    forts: UUIDS.FORTS_FRENCH,
    governors: UUIDS.GOVERNORS_FRENCH,
    ports: UUIDS.PORTS_FRENCH,
    settlements: UUIDS.SETTLEMENTS_FRENCH
  },
  dutch: {
    tag: 'dutch',
    flag: 'modules/revolutionary-pbshipgen/images/dutch.png',
    nationalities: ['Dutch'],
    others: ['spanish', 'british', 'french'],
    forts: UUIDS.FORTS_DUTCH,
    governors: UUIDS.GOVERNORS_DUTCH,
    ports: UUIDS.PORTS_DUTCH,
    settlements: UUIDS.SETTLEMENTS_DUTCH
  }
}

export const pickRandomEmpire = (): EmpireData => {
  return selectRandomElement(stockArray([
    { n: 5, item: empires.spanish },
    { n: 4, item: empires.british },
    { n: 2, item: empires.french },
    { n: 1, item: empires.dutch }
  ]))
}

export default empires
