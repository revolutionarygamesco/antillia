import type { DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderComplication = (
  context: Record<string, string>,
  situation: DoomedShip
): string => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'complications']
  const hasText = ['carrion']
  const complication = hasText.includes(situation.complication)
    ? [situation.complication, 'text']
    : [situation.complication]

  return localize([...prefix, ...complication], context)
}

export default renderComplication
