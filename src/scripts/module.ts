import AdventureState from './state/adventure/class.ts'
import createLog from './log/create.ts'
import { MODULE_ID } from './settings.ts'

import generateBottleMessage from './generators/bottle-messages.ts'

Hooks.once('init', async () => {
  const antillia = game.modules.get(MODULE_ID)
  if (!antillia) return

  antillia.api = {
    generateBottleMessage
  }
})

Hooks.once('ready', async () => {
  await createLog()
  const state = await AdventureState.load()
  await state.save()
})
