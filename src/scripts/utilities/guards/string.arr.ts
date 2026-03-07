import isString from './string.ts'
import makeArrayGuard from './array.ts'

const isStringArray = makeArrayGuard<string>(isString)

export default isStringArray
