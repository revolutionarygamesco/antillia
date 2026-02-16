const isNumber = (candidate: unknown): candidate is number => {
  if (typeof candidate !== 'number') return false
  return !isNaN(candidate)
}

export default isNumber
