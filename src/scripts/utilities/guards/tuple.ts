export type Guards<T extends readonly unknown[]> = {
  [K in keyof T]: (candidate: unknown) => candidate is T[K]
}

const makeTupleGuard = <T extends readonly unknown[]>(
  ...guards: Guards<T>
): (candidate: unknown) => candidate is T => {
  return (candidate: unknown): candidate is T => {
    if (!Array.isArray(candidate)) return false
    if (candidate.length !== guards.length) return false
    return guards.every((guard, i) => guard(candidate[i]))
  }
}

export default makeTupleGuard
