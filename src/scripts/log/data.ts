import isObject from '../utilities/guards/object.ts'
import isNumber from '../utilities/guards/number.ts'
import isString from '../utilities/guards/string.ts'

export interface LogEntryData {
  at: number
  text: string
  payload?: object
}

export const isLogEntryData = (
  candidate: unknown
): candidate is LogEntryData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isNumber(obj.at),
    isString(obj.text),
    obj.payload === undefined || isObject(obj.payload)
  ].every(test => test === true)
}
