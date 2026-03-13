import { type OutbreakSituation } from './types.ts'
import { pickRandomOutbreakDisease } from './diseases.ts'
import drawSettlement from '../../settlement.ts'
import checkExistingOutbreak from './check.ts'
import react from './react.ts'

const generateOutbreak = async (): Promise<OutbreakSituation> => {
  const settlement = await drawSettlement()
  const existing = await checkExistingOutbreak(settlement.uuid)
  if (existing) return existing

  const disease = pickRandomOutbreakDisease()
  const reaction = react()

  return {
    storyline: 'outbreak',
    location: settlement.uuid,
    disease,
    reaction,
    course: disease.stages
  }
}

export default generateOutbreak
