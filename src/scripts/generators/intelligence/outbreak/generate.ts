import { type OutbreakSituation } from './types.ts'
import { pickRandomOutbreakDisease } from './diseases.ts'
import drawSettlement from '../../../random/settlement.ts'
import checkExistingOutbreak from './check.ts'
import react from './react.ts'

const generateOutbreak = async (
  at: number = game?.time?.worldTime ?? 0
): Promise<{ situation: OutbreakSituation, existing: boolean }> => {
  const settlement = await drawSettlement()
  const existing = await checkExistingOutbreak(settlement.uuid, at)
  if (existing) return { situation: existing, existing: true }

  const disease = pickRandomOutbreakDisease()
  const reaction = react()

  return {
    situation: {
      storyline: 'outbreak',
      location: settlement.uuid,
      disease,
      reaction,
      course: disease.stages
    },
    existing: false
  }
}

export default generateOutbreak
