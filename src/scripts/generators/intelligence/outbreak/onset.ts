import type { OutbreakDisease, OutbreakStage, OutbreakReaction } from './types.ts'
import selectRandomBetween from '../../../random/between.ts'
import getStageDuration from './stage-duration.ts'

const calculateOnset = (
  disease: OutbreakDisease,
  now: number = game?.time?.worldTime ?? 0,
  stage: OutbreakStage = 'mid',
  reaction: OutbreakReaction
): number => {
  const early = getStageDuration(disease, 'early', reaction)
  const mid = getStageDuration(disease, 'mid', reaction)
  const late = getStageDuration(disease, 'late', reaction)

  // Seconds before that outbreak began.
  const delta = stage === 'early'
    ? selectRandomBetween(0, early)
    : stage === 'mid'
      ? selectRandomBetween(early + 1, early + mid)
      : selectRandomBetween(early + mid + 1, early + mid + late)

  return now - delta
}

export default calculateOnset
