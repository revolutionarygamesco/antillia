import type { Convoy } from './types.ts'
import capitalize from '../../../utilities/capital.ts'
import fromUuid from '../../../utilities/wrappers/from-uuid.ts'
import isNumber from '../../../utilities/guards/number.ts'
import loadCargo from '../../../utilities/load-cargo.ts'
import selectRandomElement from '../../../random/el.ts'
import roll from '../../../utilities/roll.ts'
import routes from './routes.ts'

const generateRandomConvoy = async (
  departure: number = game?.time?.worldTime ?? 0
): Promise<Convoy> => {
  const api = game!.modules!.get('revolutionary-pbshipgen')!.api
  const rollShip = api.rollShip
  const generateShip = api.generateShip

  // Pick a route
  const route = selectRandomElement(routes)
  const { empire } = route
  const nationality = capitalize(empire.tag)
  const base = { nationality, pirate: false, type: 'Frigate' }

  // Origin, destination, and good
  const origin = selectRandomElement(route.origins)
  const dest = selectRandomElement(route.dests)
  const good = await fromUuid(route.good.uuid) as Item

  // Generate merchant ships
  const ships: Actor[] = []
  const n = isNumber(route.ships)
    ? route.ships
    : Math.min(2, await roll(route.ships))
  for (let i = 0; i < n; i++) {
    const { details, captain } = await rollShip({ use: 'Merchant', ...base })
    const ship = await generateShip(details, captain) as Actor
    await loadCargo(ship, good)
    ships.push(ship)
  }

  // Generate escort
  const escort: Actor[] = []
  const w = isNumber(route.escort)
    ? route.escort
    : Math.min(1, await roll(route.escort))
  const wa = Math.min(n, w)
  for (let i = 0; i < wa; i++) {
    const { details, captain } = await rollShip({ use: 'Naval', ...base })
    const ship = await generateShip(details, captain) as Actor
    escort.push(ship)
  }

  return { ships, escort, empire, good, origin, dest, departure }
}

export default generateRandomConvoy
