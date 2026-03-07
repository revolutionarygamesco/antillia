import isString from './guards/string.ts'

const stringUnion = <T extends string>(
  ...values: T[]
): readonly T[] => {
  return values
}

export const makeStringUnionGuard = <T extends string>(
  values: readonly T[]
): (candidate: unknown) => candidate is T => {
  return (candidate: unknown): candidate is T => {
    const ro = values as readonly string[]
    return isString(candidate) && ro.includes(candidate)
  }
}

export default stringUnion
