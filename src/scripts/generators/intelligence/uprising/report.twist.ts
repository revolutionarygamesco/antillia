import { type UprisingStoryline } from './types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import getGenders from '../../../utilities/genders.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID } from '../../../settings.ts'

const reportTwist = (
  uprising: UprisingStoryline
): string => {
  const { masculine, feminine } = getGenders()
  const context = selectRandomElement([masculine, feminine])
  return localize([MODULE_ID, 'intelligence', 'uprising', 'twists', uprising.twist], context)
}

export default reportTwist
