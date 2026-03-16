import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const getOldCountry = (): Record<string, string> => {
  const nationalities = ['dutch', 'english', 'french', 'irish', 'scottish', 'spanish', 'welsh']
  const country: Record<string, string> = {}
  for (const nationality of nationalities) {
    country[nationality] = localize([MODULE_ID, 'last-accounts', 'item', 'requests', 'old-country', nationality])
  }
  return country
}

export default getOldCountry
