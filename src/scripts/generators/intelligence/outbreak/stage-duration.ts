import { type OutbreakDisease, type OutbreakStage, type OutbreakReaction } from './types.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'

const getStageDuration = (
  disease: OutbreakDisease,
  stage: OutbreakStage,
  reaction: OutbreakReaction
): number => {
  const effect = stage === 'early' ? 0 : reaction?.effect ?? 0
  const span = disease.stages[stage]
  const max = Math.max(...span)
  const min = Math.min(...span)
  const days = Math.max(max - min + 1 + effect, 0)
  return days * SECONDS_PER_DAY
}

export default getStageDuration
