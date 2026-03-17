import type { DoomedKin } from '../types.ts'
import isString from '../../../utilities/guards/string.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID } from '../../../settings.ts'

const renderKin = (kin: DoomedKin): string => {
  const prefix = [MODULE_ID, 'last-accounts', 'item', 'request']
  const location = isString(kin.location) ? kin.location : makeLink(kin.location)
  const sailor = localize([...prefix, 'requesters', kin.sailor.position], { name: kin.sailor.name })

  return localize([...prefix, 'relationships', kin.relationship], {
    name: kin.name,
    location,
    sailor
  })
}

export default renderKin
