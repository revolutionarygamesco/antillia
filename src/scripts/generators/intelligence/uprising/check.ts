import { isUprisingStoryline } from './types.ts'
import getPayloads from '../../../log/get-payloads.ts'
import { SECONDS_PER_WEEK } from '../../../settings.ts'

const checkUprisingAlarm = async (
  location: string,
  at: number
): Promise<number> => {
  const alarms = (await getPayloads(isUprisingStoryline, { location }))
    .filter(uprising => uprising.at <= at)
    .map(uprising => {
      const secondsOld = at - uprising.at
      const weeksOld = secondsOld / SECONDS_PER_WEEK
      const decay = 1 - (weeksOld * (0.05 / uprising.alarm))
      return decay > 0 ? uprising.alarm * decay : 0
    })
  return alarms.reduce((acc, alarm) => acc + alarm, 0)
}

export default checkUprisingAlarm
