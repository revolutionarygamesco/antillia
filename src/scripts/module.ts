import AdventureState from './state/adventure/class.ts'
import createLog from './log/create.ts'
import { MODULE_NAME } from './settings.ts'

Hooks.on('init', () => {
  console.log(`Initializing ${MODULE_NAME}...`)
})

Hooks.on('ready', () => {
  console.log(`${MODULE_NAME} is ready`)
})

Hooks.once('ready', async () => {
  await createLog()
  const state = await AdventureState.load()
  await state.save()
})
