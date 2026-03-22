import loadCargo from './cargo.ts'
import stockArray from '../../random/stock.ts'
import { UUIDS } from '../../settings.ts'

const loadSugarCargo = async (
  ship: Actor,
  ratio: number
): Promise<void> => {
  const cargo = stockArray([
    { n: 3, item: UUIDS.SUGAR_CARGO },
    { n: 1, item: UUIDS.MOLASSES_CARGO }
  ])

  await loadCargo(ship, ratio, ...cargo)
}

export default loadSugarCargo
