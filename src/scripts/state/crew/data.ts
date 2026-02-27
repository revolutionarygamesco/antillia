import isString from '../../utilities/guards/string.ts'
import isStringArray from '../../utilities/guards/string.arr.ts'
import isObject from '../../utilities/guards/object.ts'

export interface CrewPosition {
  id: string
  assigned: string[]
}

export interface CrewStateData {
  id: string
  positions: Record<string, CrewPosition>
}

export const isCrewPosition = (
  candidate: unknown
): candidate is CrewPosition => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isString(obj.id),
    isStringArray(obj.assigned)
  ].every(test => test === true)
}

export const isCrewStateData = (
  candidate: unknown
): candidate is CrewStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>
  return typeof obj.id === 'string'
}

export const isCrewStateDataArray = (
  candidate: unknown
): candidate is CrewStateData[] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(obj => isCrewStateData(obj))
}
