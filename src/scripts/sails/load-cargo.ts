import fromUuid from '../utilities/wrappers/from-uuid.ts'
import isString from '../utilities/guards/string.ts'
import selectRandomElement from '../random/el.ts'

/**
 * Loads a ship up with cargo.
 * @param {Actor} ship - The ship being loaded.
 * @param {Item | string} cargo - The cargo to load onto the ship. This should
 *   be either the cargo Item directly or the UUID of a cargo item. For each of
 *   the ship's available cargo slots, an item is selected randomly from this
 *   array, so if you only provide one item, the ship will be loaded with that
 *   item, but if you provide multiple items, the ship will carry a randomized
 *   assortment of those items.
 */

const loadCargo = async (
  ship: Actor,
  ...cargo: Array<Item | string>
): Promise<void> => {
  const items = await Promise.all(cargo.map(async (c) => {
    if (isString(c)) return await fromUuid(c) as Item
    return c
  }))

  const { max, value } = ship.system?.attributes.cargo ?? { max: 2, value: 0 }
  const slots = max - value

  const shipment: Item[] = []
  for (let i = 0; i < slots; i++) {
    shipment.push(selectRandomElement(items))
  }

  await ship.createEmbeddedDocuments('Item', shipment)
}

export default loadCargo
