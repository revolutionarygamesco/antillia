import localize from '../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import { MODULE_ID, UUIDS } from '../../settings.ts'

const varieties: Record<string, { price: number, img: string }> = {
  none: { price: 20, img: 'icons/sundries/books/book-worn-red.webp' },
  sketch: { price: 40, img: 'icons/sundries/books/book-tooled-gold-brown.webp' },
  color: { price: 80, img: 'icons/sundries/books/book-backed-silver-gold.webp' }
}

const createNaturalHistoryFolio = async (): Promise<Item> => {
  const prefix = [MODULE_ID, 'books', 'folio']
  const t = selectRandomElement(['natural', 'observations', 'description'])
  const s = selectRandomElement(['flora', 'birds', 'insects',
    'fish', 'fauna', 'trees'])
  const r = selectRandomElement(['west-indies', 'spanish-main',
    'new-spain', 'brazil', 'surinam', 'virginia', 'africa', 'east-indies',
    'levant', 'europe'])
  const i = selectRandomElement(stockArray([
    { n: 1, item: 'none' },
    { n: 2, item: 'sketch' },
    { n: 1, item: 'color' }
  ]))

  const subject = {
    title: localize([...prefix, 'subjects', s, 'title']),
    pl: localize([...prefix, 'subjects', s, 'pl'])
  }

  const region = localize([...prefix, 'regions', r]).trim()
  const illustrations = localize([...prefix, 'illustrations', i]).trim()

  const title = localize([...prefix, 'title', t], { subject: subject.title, region })
  const description = localize([...prefix, 'description'], { pl: subject.pl, region, illustrations })
  const { price, img } = varieties[i]

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img,
    folder: UUIDS.BOOKS,
    system: {
      description,
      price,
      carryWeight: 1
    },
    ownership: { default: 0 }
  })
}

export default createNaturalHistoryFolio
