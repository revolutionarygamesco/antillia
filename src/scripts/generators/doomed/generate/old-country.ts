import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const getOldCountry = (): Record<string, string> => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'request', 'relationships', 'old-country']
  const nationalities = ['dutch', 'english', 'french', 'irish', 'scottish', 'spanish', 'welsh']
  const country: Record<string, string> = {}
  for (const nationality of nationalities) {
    country[nationality] = localize([...prefix, nationality])
  }
  return country
}

export default getOldCountry
