import { type GameStateData, isGameStateDataArray } from '../game/data.ts'
import { type ExploitRecordData, isExploitRecordDataDictionary } from '../exploits/data.ts'
import isNumber from '../../utilities/guards/number.ts'
import isString from '../../utilities/guards/string.ts'
import isObject from '../../utilities/guards/object.ts'

export interface AdventureChapterData {
  n: number
  start: number | null
  end: number | null
}

export interface AdventureStateData {
  playing: string
  history: GameStateData[]
  chapters: AdventureChapterData[]
  exploits: Record<string, ExploitRecordData>
}

export const isAdventureChapterData = (
  candidate: unknown
): candidate is AdventureChapterData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    obj.start === null || isNumber(obj.start),
    obj.end === null || isNumber(obj.end),
    isNumber(obj.n)
  ].every(test => test === true)
}

export const isAdventureChapterDataArray = (
  candidate: unknown
): candidate is AdventureChapterData[] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(item => isAdventureChapterData(item))
}

export const isAdventureStateData = (
  candidate: unknown
): candidate is AdventureStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isString(obj.playing),
    isAdventureChapterDataArray(obj.chapters),
    isGameStateDataArray(obj.history),
    isExploitRecordDataDictionary(obj.exploits)
  ].every(test => test === true)
}
