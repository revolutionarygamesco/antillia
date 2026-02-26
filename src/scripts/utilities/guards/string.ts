const isString = (candidate: unknown): candidate is string => {
  return typeof candidate === 'string'
}

export default isString
