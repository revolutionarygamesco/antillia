import loadCargo from './load-cargo.ts'
import { UUIDS } from '../settings.ts'

const loadLogwoodCargo = async (
  ship: Actor,
  ratio: number
): Promise<void> => {
  await loadCargo(ship, ratio, UUIDS.LOGWOOD_CARGO)
}

export default loadLogwoodCargo
