import isNumber from '../../utilities/guards/number.ts'
import isString from '../../utilities/guards/string.ts'
import isStringArray from '../../utilities/guards/string.arr.ts'
import isObject from '../../utilities/guards/object.ts'
import makeArrayGuard from '../../utilities/guards/array.ts'

export interface CrewPosition {
  id: string
  assigned: string[]
  max?: number
  shares: number
  exempt: boolean
  exclusive: boolean
  required: boolean
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
    isStringArray(obj.assigned),
    isNumber(obj.max) || obj.max === undefined,
    isNumber(obj.shares),
    typeof obj.exempt === 'boolean',
    typeof obj.exclusive === 'boolean',
    typeof obj.required === 'boolean'
  ].every(test => test === true)
}

export const isCrewPositionRecord = (
  candidate: unknown
): candidate is Record<string, CrewPosition> => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string | number | symbol, unknown>
  return Object.entries(obj).every(([key, value]) => {
    return isString(key) && isCrewPosition(value)
  })
}

export const isCrewStateData = (
  candidate: unknown
): candidate is CrewStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isString(obj.id),
    isCrewPositionRecord(obj.positions)
  ].every(test => test === true)
}

export const isCrewStateDataArray = makeArrayGuard<CrewStateData>(isCrewStateData)
