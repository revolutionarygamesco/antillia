import isString from './string.ts'

const isStringArray = (candidate: unknown): candidate is string[] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(item => isString(item))
}

export default isStringArray
