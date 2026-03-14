import type { UprisingStoryline } from './types'
import { type EmpireData, pickRandomEmpire } from '../../empires.ts'
import checkVersion from '../../../utilities/check-version.ts'
import checkUprisingAlarm from './check.ts'
import drawIsland from '../../island.ts'
import selectRandomElement from '../../../random/el.ts'
import getSituations from './situations.ts'
import respond from './respond.ts'

const generateUprising = async (
  at: number
): Promise<{ uprising: UprisingStoryline, empire: EmpireData, island: JournalEntry }> => {
  const { premium } = await checkVersion()
  const empire = pickRandomEmpire()
  const island = await drawIsland(empire)
  const situation = selectRandomElement(getSituations(premium))
  const context = await checkUprisingAlarm(island.uuid, at)
  const response = respond(context, situation.alarm)
  const twist = selectRandomElement(situation.twists)

  return {
    empire,
    island,
    uprising: {
      storyline: 'slave-uprising',
      location: island.uuid,
      at,
      tag: situation.tag,
      twist,
      response,
      alarm: situation.alarm
    }
  }
}

export default generateUprising
