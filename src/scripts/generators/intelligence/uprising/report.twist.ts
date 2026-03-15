import { type UprisingStoryline } from './types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import getGenders from '../../../utilities/genders.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const reportTwist = (
  uprising: UprisingStoryline,
  isPremium: boolean = false
): string => {
  const prefix = [MODULE_ID, 'intelligence', 'uprising', 'twists']
  const { masculine, feminine } = getGenders()
  const context: Record<string, string> = { ...selectRandomElement([masculine, feminine]) }

  if (uprising.twist === 'cult') {
    const fishfolk = localize([...prefix, 'fishfolk'])
    context.fishfolk = isPremium
      ? makeLink({ name: fishfolk, uuid: UUIDS.PREMIUM_DEEP_ONES })
      : fishfolk
  }

  if (uprising.twist === 'necrosmith') {
    const marrowCannon = localize([...prefix, 'marrowCannon'])
    context.marrowCannon = isPremium
      ? makeLink({ name: marrowCannon, uuid: UUIDS.PREMIUM_MARROW_CANNON })
      : marrowCannon
  }

  return localize([...prefix, uprising.twist], context)
}

export default reportTwist
