import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import { MODULE_ID, UUIDS } from '../../settings.ts'

const createIlluminatedManuscript = async (): Promise<Item> => {
  const prefix = [MODULE_ID, 'books', 'illuminated']
  const typeTag = selectRandomElement(['gospel', 'lectionary', 'hours', 'psalter'])
  const coverTag = selectRandomElement(stockArray([
    { n: 1, item: 'treasure' },
    { n: 4, item: 'velvet' },
    { n: 8, item: 'leather' }
  ]))

  const century = selectRandomElement(stockArray([
    { n: 1, item: 12 },
    { n: 4, item: 13 },
    { n: 8, item: 14 },
    { n: 16, item: 15 }
  ]))

  const hasTreasureCover = coverTag === 'treasure'
  const book = localize([...prefix, 'types', typeTag])
  const type = book.toLowerCase()
  const c = localize([...prefix, 'century', century.toString()])
  const cover = localize([...prefix, 'covers', coverTag]).trim()

  const title = localize([...prefix, 'title'], { book })
  const description = localize([...prefix, 'description'], { c, type, cover })

  const age = 18 - century
  const basePrice = hasTreasureCover ? 250 : 50
  const price = basePrice + (age * 50)
  const carryWeight = hasTreasureCover ? 3 : 2
  const img = hasTreasureCover
    ? 'icons/sundries/books/book-red-cross.webp'
    : 'icons/sundries/books/book-symbol-cross-blue.webp'

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img,
    folder: UUIDS.BOOKS,
    system: {
      description,
      price,
      carryWeight
    },
    ownership: { default: 0 }
  })
}

export default createIlluminatedManuscript
