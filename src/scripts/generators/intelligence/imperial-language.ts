import localize from '../../utilities/wrappers/localize.ts'
import empires from './shared-data/empires.ts'
import { MODULE_ID } from '../../settings.ts'

const getImperialLanguage = (
  input: string | Document
): string => {
  const key = typeof input === 'string' ? input : input.name
  const prefix = [MODULE_ID, 'factions']

  for (const empire in empires) {
    const lang = localize([...prefix, empire, 'lang'])
    const name = localize([...prefix, empire, 'name'])
    if (key === name) return lang

    const adj = localize([...prefix, empire, 'adj'])
    if (key === adj) return lang
  }

  // Default to Spanish
  return localize([...prefix, 'spanish', 'lang'])
}

export default getImperialLanguage
