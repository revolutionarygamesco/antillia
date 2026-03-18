import type { DoomedShip, DoomedKin } from '../types.ts'
import isString from '../../../utilities/guards/string.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderKin = (
  context: Record<string, string>,
  situation: DoomedShip,
  kin: DoomedKin
): string => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'request']
  const location = isString(kin.location) ? kin.location : makeLink(kin.location)
  let sailor = localize([...prefix, 'requesters', kin.sailor.position], { name: kin.sailor.name })
  if (situation.author.name === kin.sailor.name) sailor = context.given
  if (kin.sailor.position === 'captain') sailor = context.captain

  return localize([...prefix, 'relationships', kin.relationship], {
    name: kin.name,
    location,
    sailor
  })
}

export default renderKin
