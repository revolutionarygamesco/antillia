import type { DoomedSailor, DoomedKin } from '../types.ts'
import type { EmpireData } from '../../empires.ts'
import drawSettlement from '../../settlement.ts'
import generatePersonalName from '../../../utilities/name.personal.ts'
import getOldCountry from './old-country.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'

const getGender = (
  relation: string,
  men: string[],
  women: string[]
): 'Masculine' | 'Feminine' => {
  if (men.includes(relation)) return 'Masculine'
  if (women.includes(relation)) return 'Feminine'
  if (relation !== 'lover') return selectRandomElement(['Masculine', 'Feminine'])
  return selectRandomElement(stockArray([
    { n: 9, item: 'Feminine' },
    { n: 1, item: 'Masculine' }
  ]))
}

const getNationality = (
  relation: string,
  sailor: DoomedSailor,
  empire: EmpireData
): string => {
  if (relation !== 'lover') return sailor.nationality
  return selectRandomElement([...empire.nationalities, ...stockArray([
    { n: 4, item: sailor.nationality }
  ])])
}

const getKin = async (
  requesters: DoomedSailor[],
  empire: EmpireData
): Promise<DoomedKin[]> => {
  const kin: DoomedKin[] = []
  const oldCountry = getOldCountry()

  for await (const sailor of requesters) {
    const men = ['son', 'father']
    const women = ['daughter', 'mother', 'wife']
    const relationship = selectRandomElement([...men, ...women, 'lover'])
    const nationality = getNationality(relationship, sailor, empire)
    const gender = getGender(relationship, men, women)
    const name = await generatePersonalName(nationality, gender)

    const local = selectRandomElement([true, false])
    const location = local ? await drawSettlement(empire) : oldCountry[nationality]

    kin.push({ name, relationship, location, sailor })
  }

  return kin
}

export default getKin
