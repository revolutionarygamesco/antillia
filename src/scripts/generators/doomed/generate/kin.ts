import type { DoomedSailor, DoomedKin } from '../types.ts'
import type { EmpireData } from '../../../random/empires.ts'
import drawSettlement from '../../../random/settlement.ts'
import generatePersonalName from '../../../utilities/name.personal.ts'
import getOldCountry from './old-country.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import getGivenName from '../../../utilities/name.given.ts'

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
    const maleKin = ['son', 'father']
    const femaleKin = ['daughter', 'mother', 'wife']
    const related = [...maleKin, ...femaleKin]
    const relationship = selectRandomElement([...maleKin, ...femaleKin, 'lover'])
    const nationality = getNationality(relationship, sailor, empire)
    const gender = getGender(relationship, maleKin, femaleKin)
    const fullName = await generatePersonalName(nationality, gender)
    const name = related.includes(relationship) ? getGivenName(fullName) : fullName

    const local = selectRandomElement([true, false])
    const location = local
      ? await drawSettlement(empire)
      : oldCountry[nationality.toLowerCase()]

    kin.push({ name, relationship, location, sailor })
  }

  return kin
}

export default getKin
