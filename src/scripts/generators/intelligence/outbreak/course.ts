import { type OutbreakStage, type OutbreakDisease, type OutbreakReaction } from './types.ts'
import getStageDuration from './stage-duration.ts'

const setCourse = (
  onset: number,
  disease: OutbreakDisease,
  reaction: OutbreakReaction
): Record<OutbreakStage, [number, number]> => {
  const durations: Record<OutbreakStage, number> = {
    early: getStageDuration(disease, 'early', reaction),
    mid: getStageDuration(disease, 'mid', reaction),
    late: getStageDuration(disease, 'late', reaction)
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
