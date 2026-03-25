import AdventureState from './state/adventure/class.ts'

import initLog from './log/init.ts'
import registerLogCommand from './log/command.ts'

import { MODULE_ID } from './settings.ts'

import changeWinds from './api/wind.ts'
import drawInfamousPirate from './generators/pirate.ts'
import generateBottleMessage from './generators/bottle-messages.ts'
import generateRareBook from './generators/books/generate.ts'
import generateIntelligence from './generators/intelligence/generate.ts'
import getRandomDisease from './random/disease.ts'
import sightSails from './sails/sight.ts'

Hooks.once('init', async () => {
  const antillia = game.modules.get(MODULE_ID)
  if (!antillia) return

  antillia.api = {
    changeWinds,
    drawInfamousPirate,
    generateBottleMessage,
    generateRareBook,
    generateIntelligence,
    getRandomDisease,
    sightSails
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
