const generateShip = async (
  details: Record<string, any>
): Promise<Actor> => {
  const api = game!.modules!.get('revolutionary-pbshipgen')!.api
  const rollShip = api.rollShip
  const generateShip = api.generateShip

  const { details: d, captain } = await rollShip(details)
  return await generateShip(d, captain) as Actor
}

export default generateShip
