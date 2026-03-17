import type { DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderTale = (
  context: Record<string, string>,
  situation: DoomedShip
): string => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'tale']
  const isCaptain = situation.author.position === 'captain'
  const isCaptainKey = isCaptain ? 'captain' : 'other'
  const captainDivergentTales = ['metamorphosis']
  const taleKey = [situation.tale]
  if (captainDivergentTales.includes(situation.tale)) taleKey.push(isCaptainKey)
  return localize([...prefix, ...taleKey], context)
}

export default renderTale
