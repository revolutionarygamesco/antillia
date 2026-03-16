interface ShipDetails {
  nationality: string
  use: string
  pirate: boolean
  upgrades: string[]
  specialty: string[]
  name: string
  type: string
  crewSize: string
  shanties: number
  captain: {
    culture: string,
    xp: string
  }
}

export const generateShip = async (
  details: Record<string, any>
): Promise<{ ship: Actor, captain: Actor, details: ShipDetails }> => {
  const api = game!.modules!.get('revolutionary-pbshipgen')!.api
  const roll = api.rollShip
  const generate = api.generateShip

  const { details: d, captain } = await roll(details)
  const ship = await generate(d, captain) as Actor
  return { ship, captain, details: d }
}

export default generateShip
