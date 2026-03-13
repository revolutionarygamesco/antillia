import { type OutbreakStage, type OutbreakDisease, type OutbreakReaction } from './types.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'

const getDuration = (
  stage: [number, number],
  reaction?: OutbreakReaction
): number => {
  const effect = reaction?.effect ?? 0
  const days = Math.max(0, Math.max(...stage) - Math.min(...stage) + effect)
  return days * SECONDS_PER_DAY
}

const setCourse = (
  onset: number,
  disease: OutbreakDisease,
  reaction: OutbreakReaction
): Record<OutbreakStage, [number, number]> => {
  const durations: Record<OutbreakStage, number> = {
    early: getDuration(disease.stages.early),
    mid: getDuration(disease.stages.mid, reaction),
    late: getDuration(disease.stages.late, reaction)
  }

  const earlyEnds = onset + durations.early
  const midBegins = earlyEnds + 1
  const midEnds = midBegins + durations.mid
  const lateBegins = midEnds + 1
  const lateEnds = lateBegins + durations.late

  return {
    early: [onset, earlyEnds],
    mid: [midBegins, midEnds],
    late: [lateBegins, lateEnds]
  }
}

export default setCourse
