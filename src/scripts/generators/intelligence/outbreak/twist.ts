import { type OutbreakStage, type OutbreakTwist } from './types.ts'
import { SECONDS_PER_WEEK } from '../../../settings.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'

const twistStage = (
  options: OutbreakTwist[],
  duration: [number, number]
): OutbreakTwist | null => {
  const weeks = Math.floor((Math.max(...duration) - Math.min(...duration)) / SECONDS_PER_WEEK)
  const twist = selectRandomElement(stockArray([
    { n: 1, item: false },
    { n: weeks, item: true }
  ]))
  return twist ? selectRandomElement(options) : null
}

const twistEarly = (
  duration: [number, number]
): OutbreakTwist | null => {
  const options: OutbreakTwist[] = ['faith-healer', 'doctor', 'witch-hunt']
  return twistStage(options, duration)
}

const twistMid = (
  duration: [number, number]
): OutbreakTwist | null => {
  const options: OutbreakTwist[] = ['faith-healer', 'doctor', 'witch-hunt',
    'price-gouging', 'authorities-fled', 'undefended']
  return twistStage(options, duration)
}

const twistLate = (
  duration: [number, number]
): OutbreakTwist | null => {
  const options: OutbreakTwist[] = ['faith-healer', 'doctor', 'witch-hunt',
    'price-gouging', 'authorities-fled', 'undefended']
  return twistStage(options, duration)
}

const twist = (
  course: Record<OutbreakStage, [number, number]>
): Record<OutbreakStage, OutbreakTwist | null> => {
  return {
    early: twistEarly(course.early),
    mid: twistMid(course.mid),
    late: twistLate(course.late)
  }
}

export default twist
