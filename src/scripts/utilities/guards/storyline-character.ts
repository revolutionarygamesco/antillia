import isObject from './object.ts'
import isString from './string.ts'
import isNumber from './number.ts'
import makeArrayGuard from './array.ts'

const isStorylineCharacter = (
  candidate: unknown
): candidate is StorylineCharacter => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>

  return [
    isString(obj.name),
    isString(obj.uuid),
    isString(obj.tag),
    obj.date === undefined || isNumber(obj.date)
  ].every(test => test === true)
}

export const isStorylineCharacterArray = makeArrayGuard<StorylineCharacter>(isStorylineCharacter)

export default isStorylineCharacter
