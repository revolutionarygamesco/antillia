import { type OutbreakSituation, isOutbreakSituation } from './types.ts'
import getPayloads from '../../../log/get-payloads.ts'

const checkExistingOutbreak = async (
  location: string,
  at: number = game?.time?.worldTime ?? 0
): Promise<OutbreakSituation | null> => {
  const payloads = (await getPayloads(isOutbreakSituation, { location }))
    .filter(situation => {
      const min = Math.min(...situation.course.early)
      const max = Math.max(...situation.course.late)
      return at >= min && at<= max
    })

  return payloads.length < 1
    ? null
    : payloads[payloads.length - 1]
}

export default checkExistingOutbreak
