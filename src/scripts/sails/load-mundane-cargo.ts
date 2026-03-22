import loadCargo from './load-cargo.ts'
import drawFirst from '../utilities/draw-first.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import { UUIDS } from '../settings.ts'

const loadMundaneCargo = async (
  ship: Actor,
  heavy: boolean = false
): Promise<void> => {
  const { max, value } = ship.system?.attributes.cargo ?? { max: 2, value: 0 }
  const highest = max - value
  const num = heavy ? highest : Math.ceil(highest / 2)
  const cargo: Item[] = []

  for (let i = 0; i < num; i++) {
    const result = await drawFirst(UUIDS.PREMIUM_MUNDANE_CARGO)
    const item = await fromUuid(result?.documentUuid!) as Item
    cargo.push(item)
  }

  await loadCargo(ship, ...cargo)
}

export default loadMundaneCargo
