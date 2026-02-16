import isNumber from '../../utilities/guards/number.ts'
import isObject from '../../utilities/guards/object.ts'
import { type CrewStateData, isCrewStateDataArray } from '../crew/data.ts'

export interface GameStateData {
  at: number
  chapter: number
  crews: CrewStateData[]
}

export const isGameStateData = (
  candidate: unknown
): candidate is GameStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  if (!isNumber(obj.at)) return false
  if (!isNumber(obj.chapter)) return false
  return isCrewStateDataArray(obj.crews)
}

export const isGameStateDataArray = (
  candidate: unknown
): candidate is GameStateData[] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(item => isGameStateData(item))
}
