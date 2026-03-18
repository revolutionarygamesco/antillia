import type { DoomedShip } from '../types.ts'
import getGivenName from '../../../utilities/name.given.ts'
import makeLink from '../../../utilities/make-link.ts'

const addNameContext = (
  context: Record<string, string>,
  situation: DoomedShip
): void => {
  const isCaptain = situation.author.position === 'captain'
  let full = situation.author.name

  if (isCaptain) {
    const match = full.match(/Captain (.*)/)
    if (match && match.length > 1) full = match[1]
  }

  context.given = getGivenName(full)
  context.author = isCaptain ? makeLink(situation.captain) : full
}

export default addNameContext
