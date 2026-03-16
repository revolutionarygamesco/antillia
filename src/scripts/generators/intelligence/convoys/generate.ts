import type { Convoy } from './types.ts'
import generateShip from '../../../utilities/generate-ship.ts'
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
    const { ship } = await generateShip({ use: 'Merchant', ...base })
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
    const { ship } = await generateShip({ use: 'Naval', ...base })
    escort.push(ship)
  }

  return { ships, escort, empire, good, origin, dest, departure }
}

export default generateRandomConvoy
