import generateGrimoire from './generate.ts'
import decapitalize from '../../../utilities/decapital.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { grimoireIcons } from './data.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const createGrimoire = async (): Promise<Item> => {
  const grimoire = generateGrimoire()
  const len = grimoire.rituals.length

  const prefix = [MODULE_ID, 'books', 'grimoires']
  const d = localize([...prefix, grimoire.school, 'descriptions', grimoire.adj])
  const adj = localize([...prefix, grimoire.adj, 'adj'])
  const name = localize([...prefix, grimoire.occultist, 'occultist'])
  const occultist = localize([...prefix, grimoire.occultist, 'description'])
  const number = decapitalize(localize([MODULE_ID, 'numbers', len.toString()]))
  const rituals = grimoire.rituals.map(r => `<li>@UUID[${r.uuid}]</li>`)

  const title = localize([...prefix, grimoire.school, 'title'], { adj, occultist: name })
  const description = localize([...prefix, 'description'], { description: d, occultist, number, rituals })

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: grimoireIcons[grimoire.school],
    folder: UUIDS.BOOKS,
    system: {
      description,
      value: len * 200,
      carryWeight: len
    },
    ownership: { default: 0 }
  })
}

export default createGrimoire
