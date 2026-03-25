import AdventureState from '../state/adventure/class.ts'
import drawFirst from '../utilities/draw-first.ts'
import localize from '../utilities/wrappers/localize.ts'
import makeLink from '../utilities/make-link.ts'
import roll from '../utilities/roll.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const display = async (
  name: string,
  description: string
): Promise<void> => {
  const prefix = [MODULE_ID, 'boredom']
  await foundry.documents.ChatMessage.create({
    speaker: { alias: localize([...prefix, 'speaker']) },
    flavor: localize([...prefix, 'flavor']),
    content: `<p><strong>${name}</strong>${description}`,
    whisper: [game.user.id]
  })
}

const merriment = async (): Promise<void> => {
  const result = await drawFirst(UUIDS.MERRIMENT)
  if (result) return await display(result?.name, result.description ?? '')
  return await getNameDescription('tedium')
}

const getNameDescription = async (tag: string): Promise<void> => {
  const prefix = [MODULE_ID, 'boredom', tag]
  const text = localize([...prefix, 'link'])
  const link = makeLink({ name: text, uuid: UUIDS.JOURNAL_RULES_QUARRELS })

  const name = localize([...prefix, 'name'])
  const description = localize([...prefix, 'description'], { link })
  await display(name, description)
}

const rollBoredom = async (): Promise<void> => {
  const state = await AdventureState.load()
  const skill = state.playing?.skill ?? 0
  const result = await roll(`2d6+${skill}`)

  if (result > 8) return await merriment()
  if (result < 6) return await getNameDescription('quarrel')
  return await getNameDescription('tedium')
}

export default rollBoredom
