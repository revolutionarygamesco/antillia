import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import { MODULE_ID, UUIDS } from '../../settings.ts'

const createPilotBook = async (): Promise<Item> => {
  const { periods, age } = selectRandomElement(stockArray([
    { n: 1, item: { periods: 3, age: 'old' } },
    { n: 2, item: { periods: 2, age: 'moderate' } },
    { n: 3, item: { periods: 1, age: 'new' } },
  ]))

  const chancesUsed = stockArray([{ n: 2, item: true }, { n: 1, item: false }])
  let uses = 0
  for (let i = 0; i < periods; i++) {
    if (selectRandomElement(chancesUsed)) uses++
  }

  let wear = 'pristine'
  if (uses === 1) wear = 'moderate'
  if (uses > 1) wear = 'worn'

  const hasIntro = selectRandomElement(stockArray([
    { n: 1, item: true },
    { n: 2, item: false }
  ]))

  const regionTag = selectRandomElement(stockArray([
    { n: 1, item: 'europe' },
    { n: 1, item: 'mediterranean' },
    { n: 1, item: 'east' },
    { n: 3, item: 'west' }
  ]))

  const langTag = selectRandomElement(['dutch', 'english', 'french', 'german', 'latin'])
  const descTag = hasIntro ? 'intro' : 'base'

  const prefix = [MODULE_ID, 'books', 'pilot']
  const lang = localize([...prefix, 'languages', langTag])
  const region = localize([...prefix, 'region', regionTag]).trim()
  const condition = localize([...prefix, 'condition', age, wear])

  const title = localize([...prefix, 'title'])
  const description = localize([...prefix, 'description', descTag], { lang, region, condition })
  const price = (periods * 20) - (uses * 10)

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: 'icons/sundries/books/book-symbol-anchor-brown.webp',
    folder: UUIDS.BOOKS,
    system: {
      description,
      price,
      carryWeight: 1
    },
    ownership: { default: 0 }
  })
}

export default createPilotBook
