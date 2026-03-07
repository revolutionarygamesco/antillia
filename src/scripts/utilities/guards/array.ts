const makeArrayGuard = <T>(
  singular: (candidate: unknown) => candidate is T
): (candidate: unknown) => candidate is T[] => {
  return (candidate: unknown): candidate is T[] => {
    if (!Array.isArray(candidate)) return false
    return candidate.every(item => singular(item))
  }
}

export default makeArrayGuard
