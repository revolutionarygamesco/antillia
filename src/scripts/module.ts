import AdventureState from './state/adventure/class.ts'
import localize from './utilities/wrappers/localize.ts'
import addLog from './log/add.ts'
import initLog from './log/init.ts'
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
  const prefix = [MODULE_ID, 'log', 'command']

  commands.register({
    name: '/log',
    module: 'revolutionary-antillia',
    description: localize([...prefix, 'description']),
    icon: '<i class="fa-solid fa-book"></i>',
    callback: (_chat: any, parameters: any) => {
      addLog(parameters).then()
      return {}
    },
    autocompleteCallback: (menu: any, alias: any) => {
      const entries = [
        (game as any).chatCommands.createCommandElement(
          localize([...prefix, 'autocomplete', 'alias'], { alias }),
          localize([...prefix, 'autocomplete', 'description']),
        )
      ]
      entries.length = Math.min(entries.length, menu.maxEntries)
      return entries
    }
  })
})
