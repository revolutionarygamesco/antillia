const isWithinRange = (
  n: number,
  range: number[],
  inclusive: boolean = true
): boolean => {
  const min = Math.min(...range)
  const max = Math.max(...range)

  const isGreatenThanMin = inclusive ? n >= min : n > min
  const isLessThanMax = inclusive ? n <= max : n < max
  return isGreatenThanMin && isLessThanMax
}

export default isWithinRange
