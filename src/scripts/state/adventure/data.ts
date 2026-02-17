import { type GameStateData } from '../game/data.ts'
import isObject from '../../utilities/guards/object.ts'
import { isGameStateDataArray } from '../game/data.ts'

export interface AdventureStateData {
  playing: string
  history: GameStateData[]
}

export const isAdventureStateData = (
  candidate: unknown
): candidate is AdventureStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  if (typeof obj.playing !== 'string') return false
  return isGameStateDataArray(obj.history)
}
