import AdventureState from './state/adventure/class.ts'

import initLog from './log/init.ts'
import registerLogCommand from './log/command.ts'

import { MODULE_ID } from './settings.ts'

import generateBottleMessage from './generators/bottle-messages.ts'
import getRandomDisease from './random/disease.ts'

Hooks.once('init', async () => {
  const antillia = game.modules.get(MODULE_ID)
  if (!antillia) return

  antillia.api = {
    generateBottleMessage,
    getRandomDisease
  }
})

Hooks.once('ready', async () => {
  await initLog()
  const state = await AdventureState.load()
  await state.save()
})

Hooks.once('chatCommandsReady', commands => {
  registerLogCommand(commands)
})
