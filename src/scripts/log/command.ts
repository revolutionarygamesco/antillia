import localize from '../utilities/wrappers/localize.ts'
import addLog from './add.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const registerLogCommand = (commands: any): void => {
  const prefix = [MODULE_ID, 'log', 'command']

  commands.register({
    name: '/log',
    module: 'revolutionary-antillia',
    description: localize([...prefix, 'description']),
    icon: '<i class="fa-solid fa-book"></i>',
    callback: (_chat: any, parameters: any) => {
      addLog(parameters).then()

      return {
        speaker: { alias: localize([...prefix, 'response', 'speaker']) },
        content: localize([...prefix, 'response', 'content'], { uuid: UUIDS.LOG }),
        whisper: [game?.user?.id]
      };

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
}

export default registerLogCommand
