import isStringArray from './string.arr.ts'
import makeArrayGuard from './array.ts'

const isStringArray2 = makeArrayGuard<string[]>(isStringArray)

export default isStringArray2
