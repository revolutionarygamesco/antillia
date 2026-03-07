import { type OutbreakSituation, type OutbreakStage } from './types.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import isWithinRange from '../../../utilities/range.ts'

const calculateTimeline = (
  onset: number,
  impact: number,
  original: number[]
): number[] => {
  return original.map(d => onset + (d * impact * SECONDS_PER_DAY))
}

const getOutbreakStage = (situation: OutbreakSituation, at: number): OutbreakStage | null => {
  const { onset, impact, disease } = situation
  const early = calculateTimeline(onset, impact, disease.stages.early)
  const mid = calculateTimeline(onset, impact, disease.stages.mid)
  const late = calculateTimeline(onset, impact, disease.stages.late)

  if (isWithinRange(at, early)) return 'early'
  if (isWithinRange(at, mid)) return 'mid'
  if (isWithinRange(at, late)) return 'late'
  return null
}

export default getOutbreakStage
