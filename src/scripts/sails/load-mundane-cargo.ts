import loadCargo from './load-cargo.ts'
import drawFirst from '../utilities/draw-first.ts'
import isString from '../utilities/guards/string.ts'
import { UUIDS } from '../settings.ts'

const loadMundaneCargo = async (
  ship: Actor,
  ratio: number
): Promise<void> => {
  const { max, value } = ship.system?.attributes.cargo ?? { max: 2, value: 0 }
  const num = Math.ceil((max - value) * ratio)
  const uuids: (string | null)[] = []

  for (let i = 0; i < num; i++) {
    const result = await drawFirst(UUIDS.PREMIUM_MUNDANE_CARGO)
    uuids.push(result?.documentUuid ?? null)
  }

  const cargo = uuids.filter(item => isString(item))
  await loadCargo(ship, ratio, ...cargo)
}

export default loadMundaneCargo
