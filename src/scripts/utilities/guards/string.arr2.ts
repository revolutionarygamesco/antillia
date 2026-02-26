import isStringArray from './string.arr.ts'

const isStringArray2 = (candidate: unknown): candidate is string[][] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(item => isStringArray(item))
}

export default isStringArray2
