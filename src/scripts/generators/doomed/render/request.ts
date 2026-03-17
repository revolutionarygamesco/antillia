import type { DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import renderKin from './kin.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderRequest = (
  context: Record<string, string>,
  situation: DoomedShip
): string => {
  const list = situation.kin.map(kin => renderKin(kin)).join('\n')
  const key = situation.includeMap ? 'split' : 'notify'
  return localize([MODULE_ID, 'last-accounts', 'item', 'request', key], { ...context, list })
}

export default renderRequest
