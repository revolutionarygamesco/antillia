import isString from './guards/string.ts'

const stringUnion = <T extends string>(
  ...values: T[]
): readonly T[] => {
  return values
}

export const makeStringUnionGuard = <T extends string>(
  values: readonly T[]
) => {
  return (candidate: unknown) => {
    const ro = values as readonly string[]
    return isString(candidate) && ro.includes(candidate)
  }
}

export default stringUnion
