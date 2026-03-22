import type { TradeRouteType } from './routes.ts'
import checkVersion from '../utilities/check-version.ts'
import generateShip from './generate-ship.ts'
import isGuineaman from './guineaman/check.ts'
import loadLogwoodCargo from './cargo/logwood.ts'
import loadMundaneCargo from './cargo/mundane.ts'
import loadSugarCargo from './cargo/sugar.ts'
import localize from '../utilities/wrappers/localize.ts'
import makeGuineaman from './guineaman/make.ts'
import makeLink from '../utilities/make-link.ts'
import selectRandomElement from '../random/el.ts'
import { MODULE_ID } from '../settings.ts'

const getHighTags = (
  details: Record<string, any>,
  ratio: number,
  route: TradeRouteType
): string[] => {
  if (details.use !== 'Merchant' || details.pirate) return ['war']
  if (route === 'slaves') return ['slave']

  const weight = ratio > 0.5 ? 'heavy' : 'light'
  return ['merchant', weight]
}

const sightSails = async (
  established: Record<string, any>,
  routes: TradeRouteType[] = [],
  whisper: string[] = [game.user.id]
): Promise<void> => {
  const { historical, premium } = await checkVersion()
  let route = routes.length > 0
    ? selectRandomElement(routes)
    : 'local'

  if (route === 'slaves') {
    if (isGuineaman(established, historical, true)) {
      makeGuineaman(established)
    } else {
      route = 'local'
    }
  }

  const { ship, details } = await generateShip(established)
  const heavy = selectRandomElement([true, false])
  const ratio = heavy ? 1 : 0.5

  if (details.use === 'Merchant') {
    if (premium && route === 'local') await loadMundaneCargo(ship, ratio)
    if (route === 'sugar') await loadSugarCargo(ship, ratio)
    if (route === 'logwood') await loadLogwoodCargo(ship, ratio)
  }

  const prefix = [MODULE_ID, 'sails']
  const flavor = localize([...prefix, 'flavor'])
  const alias = localize([...prefix, 'speaker'])
  const c = localize([...prefix, 'classes', details.type, 'name'])
  const masts = localize([...prefix, 'classes', details.type, 'masts'])

  const highTags = getHighTags(details, ratio, route)
  const reportContext = { masts, class: c, nation: details.nationality }
  const low = localize([...prefix, 'report', 'low'], reportContext)
  const medium = localize([...prefix, 'report', 'medium'], reportContext)
  const high = localize([...prefix, 'report', 'high', ...highTags], reportContext)

  const messageContext = { low, medium, high, ship: makeLink(ship) }
  const content = localize([...prefix, 'message'], messageContext)

  await foundry.documents.ChatMessage.create({ speaker: { alias }, flavor, content, whisper })
}

export default sightSails
