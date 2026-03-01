import isObject from '../../../utilities/guards/object.ts'
import isString from '../../../utilities/guards/string.ts'

export interface AshKingpin {
  name: string
  gender: 'Masculine' | 'Feminine'
}

export interface AshKingpinStoryline {
  storyline: 'ash-kingpin',
  location: string,
  resident: AshKingpin | null
}

export const isAshKingpin = (
  candidate: unknown
): candidate is AshKingpin => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isString(obj.name),
    obj.gender === 'Masculine' || obj.gender === 'Feminine'
  ].every(test => test === true)
}

export const isAshKingpinStoryline = (
  candidate: unknown
): candidate is AshKingpinStoryline => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    obj.storyline === 'ash-kingpin',
    isString(obj.location),
    obj.resident === null || isAshKingpin(obj.resident)
  ].every(test => test === true)
}
