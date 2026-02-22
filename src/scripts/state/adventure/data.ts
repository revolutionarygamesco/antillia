import { type GameStateData } from '../game/data.ts'
import isNumber from '../../utilities/guards/number.ts'
import isObject from '../../utilities/guards/object.ts'
import { isGameStateDataArray } from '../game/data.ts'

export interface AdventureChapterData {
  n: number
  start: number | null
  end: number | null
}

export interface AdventureStateData {
  playing: string
  history: GameStateData[]
  chapters: AdventureChapterData[]
}

export const isAdventureChapterData = (
  candidate: unknown
): candidate is AdventureChapterData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  if (!isNumber(obj.start) && obj.start !== null) return false
  if (!isNumber(obj.end) && obj.end !== null) return false
  return isNumber(obj.n)
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

  if (typeof obj.playing !== 'string') return false
  if (!isAdventureChapterDataArray(obj.chapters)) return false
  return isGameStateDataArray(obj.history)
}
