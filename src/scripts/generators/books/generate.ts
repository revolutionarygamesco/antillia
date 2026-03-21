import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import makeLink from '../../utilities/make-link.ts'
import { MODULE_ID } from '../../settings.ts'

import createGrimoire from './grimoires/create.ts'

const generateRareBook = async (): Promise<void> => {
  const generators: Array<() => Promise<Item>> = stockArray([
    { n: 1, item: createGrimoire }
  ])

  const generator = selectRandomElement(generators)
  const book = await generator()
  const content = makeLink(book)

  const prefix = [MODULE_ID, 'books', 'message']
  const alias = localize([...prefix, 'speaker'])
  const flavor = localize([...prefix, 'flavor'])

  await foundry.documents.ChatMessage.create({
    speaker: { alias },
    flavor,
    content,
    whisper: [game.user.id]
  })
}

export default generateRareBook
