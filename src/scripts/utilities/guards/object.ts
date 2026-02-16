const isObject = (candidate: unknown): candidate is object => {
  const hasObjectType = typeof candidate === 'object'
  const isNotNull = candidate !== null
  const isNotArray = !Array.isArray(candidate)
  return hasObjectType && isNotNull && isNotArray
}

export default isObject
