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

export const outbreakTwists = stringUnion('faith-healer', 'doctor',
  'witch-hunt', 'price-gouging', 'authorities-fled', 'undefended', 'slave')
export type OutbreakTwist = typeof outbreakTwists[number]
export const isOutbreakTwist = makeStringUnionGuard<OutbreakTwist>(outbreakTwists)
export const isOutbreakTwistArray = makeArrayGuard<OutbreakTwist>(isOutbreakTwist)
export const isOutbreakTwistOrNull = (
  candidate: unknown
): candidate is OutbreakTwist | null => {
  return candidate === null || isOutbreakTwist(candidate)
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
export const isOutbreakStageReactions = makeOutbreakStageRecordGuard(isOutbreakReaction)
export const isOutbreakStageTwists = makeOutbreakStageRecordGuard(isOutbreakTwistOrNull)

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
  course: Record<OutbreakStage, [number, number]>
  reactions: Record<OutbreakStage, OutbreakReaction>
  twists: Record<OutbreakStage, OutbreakTwist | null>
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
    isOutbreakStageSpans(obj.course),
    isOutbreakStageReactions(obj.reactions),
    isOutbreakStageTwists(obj.twists)
  ].every(test => test === true)
}
