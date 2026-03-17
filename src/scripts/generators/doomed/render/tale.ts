import type { DoomedShip } from '../types.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderTale = (
  context: Record<string, string>,
  situation: DoomedShip
): string => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'tales']
  const isCaptain = situation.author.position === 'captain'
  const isCaptainKey = isCaptain ? 'captain' : 'other'
  const captainDivergentTales = ['metamorphosis']
  const taleKey = captainDivergentTales.includes(situation.tale)
    ? [situation.tale, isCaptainKey]
    : [situation.tale, 'text']

  const title = localize([...prefix, situation.tale, 'title'], context)
  const tale = localize([...prefix, ...taleKey], context)

  return `<h3>${title}</h3>\n${tale}`
}

export default renderTale
