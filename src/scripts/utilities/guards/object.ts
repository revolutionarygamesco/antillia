const isObject = (candidate: unknown): candidate is object => {
  if (candidate === null) return false
  if (typeof candidate !== 'object') return false
  return !Array.isArray(candidate)
}

export default isObject
