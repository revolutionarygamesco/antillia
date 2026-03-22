import AdventureState from './adventure/class.ts'

const changeWinds = async (): Promise<void> => {
  const adventure = await AdventureState.load()
  const crew = adventure.playing
  if (!crew) return

  await crew.wind.change()
  await adventure.save()
}

export default changeWinds
