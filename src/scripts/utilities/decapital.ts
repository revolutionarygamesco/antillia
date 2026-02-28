import { changeInitialCase } from './capital.ts'

const decapitalize = (str: string): string => {
  return changeInitialCase(str, 'lower')
}

export default decapitalize
