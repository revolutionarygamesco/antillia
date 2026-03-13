import stringUnion, { makeStringUnionGuard } from '../../../utilities/string-union.ts'
import makeArrayGuard from '../../../utilities/guards/array.ts'
import makeTupleGuard from '../../../utilities/guards/tuple.ts'
import isObject from '../../../utilities/guards/object.ts'
import isNumber from '../../../utilities/guards/number.ts'
import isString from '../../../utilities/guards/string.ts'

export const outbreakReactionTags = stringUnion('ignore', 'prayer',
  'fumigation', 'quarantine', 'closure')
export type OutbreakReactionTag = typeof outbreakReactionTags[number]
export const isOutbreakReactionTag = makeStringUnionGuard<OutbreakReactionTag>(outbreakReactionTags)
export const isOutbreakReactionTagArray = makeArrayGuard<OutbreakReactionTag>(isOutbreakReactionTag)

export interface OutbreakReaction {
  tag: OutbreakReactionTag
  effect: number
}

export const isOutbreakReaction = (
  candidate: unknown
): candidate is OutbreakReactionTag => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>
  return [
    isOutbreakReactionTag(obj.tag),
    isNumber(obj.effect)
  ].every(test => test === true)
}

export const outbreakStages = stringUnion('early', 'mid', 'late')
export type OutbreakStage = typeof outbreakStages[number]
export const isOutbreakStage = makeStringUnionGuard(outbreakStages)
export const isOutbreakStageArray = makeArrayGuard<OutbreakStage>(isOutbreakStage)

const makeOutbreakStageRecordGuard = <T>(
  guard: (candidate: unknown) => candidate is T
): (candidate: unknown) => candidate is Record<OutbreakStage, T> => {
  return (candidate: unknown): candidate is Record<OutbreakStage, T> => {
    if (!isObject(candidate)) return false
    const obj = candidate as Record<string, unknown>
    if (Object.keys(obj).sort().join(' ') !== 'early late mid') return false
    return ['early', 'mid', 'late'].every(stage => guard(obj[stage]))
  }
}

const isStageTuple = makeTupleGuard(isNumber, isNumber)
export const isOutbreakStageSpans = makeOutbreakStageRecordGuard(isStageTuple)

export interface OutbreakDisease {
  tag: string
  uuid: string
  stages: Record<OutbreakStage, [number, number]>
}

export const isOutbreakDisease = (
  candidate: unknown
): candidate is OutbreakDisease => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>
  return [
    isString(obj.tag),
    isString(obj.uuid),
    isOutbreakStageSpans(obj.stages)
  ].every(test => test === true)
}

export interface OutbreakSituation {
  storyline: 'outbreak'
  location: string
  disease: OutbreakDisease
  reaction: OutbreakReaction
  course: Record<OutbreakStage, [number, number]>
}

export const isOutbreakSituation = (
  candidate: unknown
): candidate is OutbreakSituation => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    obj.storyline === 'outbreak',
    isString(obj.location),
    isOutbreakDisease(obj.disease),
    isOutbreakReaction(obj.reaction),
    isOutbreakStageSpans(obj.course)
  ].every(test => test === true)
}
