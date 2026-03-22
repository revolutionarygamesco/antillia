import loadCargo from './cargo.ts'
import { UUIDS } from '../../settings.ts'

const loadAshCargo = async (
  ship: Actor,
  ratio: number
): Promise<void> => {
  await loadCargo(ship, ratio, UUIDS.ASH_CARGO)
}

export default loadAshCargo
