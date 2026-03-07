import { type OutbreakSituation, type OutbreakStage } from './types.ts'
import isWithinRange from '../../../utilities/range.ts'

const getOutbreakStage = (outbreak: OutbreakSituation, at: number): OutbreakStage | null => {
  const { early, mid, late } = outbreak.course

  if (isWithinRange(at, early)) return 'early'
  if (isWithinRange(at, mid)) return 'mid'
  if (isWithinRange(at, late)) return 'late'
  return null
}

export default getOutbreakStage
