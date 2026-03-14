import isObject from '../../../utilities/guards/object.ts'
import isNumber from '../../../utilities/guards/number.ts'
import isString from '../../../utilities/guards/string.ts'

export interface UprisingSituation {
  tag: string
  twists: string[]
  alarm: number
}

export interface UprisingStoryline {
  storyline: 'slave-uprising'
  location: string
  at: number
  tag: string
  twist: string
  response: string
  alarm: number
}

export const isUprisingStoryline = (
  candidate: unknown
): candidate is UprisingStoryline => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    obj.storyline === 'slave-uprising',
    isString(obj.location),
    isNumber(obj.at),
    isString(obj.tag),
    isString(obj.twist),
    isString(obj.response),
    isNumber(obj.alarm)
  ].every(test => test === true)
}
