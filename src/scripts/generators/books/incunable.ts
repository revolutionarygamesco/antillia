import localize from '../../utilities/wrappers/localize.ts'
import selectRandomBetween from '../../random/between.ts'
import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'
import {MODULE_ID, UUIDS} from '../../settings.ts'

export interface IncunablePublisherData {
  tag: string
  active: [number, number]
  value: [number, number]
}

const publishers: Array<{ n: number, item: IncunablePublisherData }> = [
  { n: 1, item: { tag: 'gutenberg', active: [1450, 1468], value: [500, 1200] } },
  { n: 10, item: { tag: 'koberger', active: [1470, 1513], value: [100, 350] } },
  { n: 8, item: { tag: 'verard', active: [1485, 1512], value: [50, 130] } },
  { n: 7, item: { tag: 'gruninger', active: [1483, 1531], value: [35, 90] } },
  { n: 6, item: { tag: 'amerbach', active: [1478, 1513], value: [40, 100] } },
  { n: 5, item: { tag: 'manutius', active: [1494, 1515], value: [200, 600] } },
  { n: 5, item: { tag: 'jenson', active: [1470, 1480], value: [120, 300] } },
  { n: 5, item: { tag: 'caxton', active: [1476, 1491], value: [60, 180] } },
  { n: 5, item: { tag: 'ratdolt', active: [1476, 1486], value: [70, 180] } },
  { n: 5, item: { tag: 'zell', active: [1464, 1508], value: [20, 60] } },
  { n: 4, item: { tag: 'fust-schoeffer', active: [1457, 1503], value: [200, 500] } },
  { n: 4, item: { tag: 'zainer', active: [1468, 1478], value: [40, 100] } },
  { n: 4, item: { tag: 'han', active: [1467, 1478], value: [30, 80] } },
  { n: 4, item: { tag: 'koelhoff', active: [1472, 1493], value: [20, 55] } },
  { n: 4, item: { tag: 'wenssler', active: [1472, 1491], value: [25, 65] } },
  { n: 3, item: { tag: 'sweynheym-pannartz', active: [1467, 1473], value: [80, 220] } },
  { n: 3, item: { tag: 'mentelin', active: [1460, 1478], value: [25, 70] } },
  { n: 3, item: { tag: 'eggestein', active: [1466, 1488], value: [20, 55] } },
  { n: 2, item: { tag: 'ruppel', active: [1468, 1474], value: [30, 75] } },
  { n: 2, item: { tag: 'valdarfer', active: [1471, 1474], value: [30, 80] } },
]

const createIncunable = async (): Promise<Item> => {
  const publisher = selectRandomElement(stockArray(publishers))
  const year = selectRandomBetween(...publisher.active)
  const price = selectRandomBetween(...publisher.value)

  const prefix = [MODULE_ID, 'books', 'incunables']
  const name = localize([...prefix, 'publishers', publisher.tag, 'name'])
  const city = localize([...prefix, 'publishers', publisher.tag, 'city'])

  const title = localize([...prefix, 'title'])
  const description = localize([...prefix, 'description'], { year, publisher: name, city })

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: 'icons/sundries/books/book-tooled-grey.webp',
    folder: UUIDS.BOOKS,
    system: {
      description,
      price,
      carryWeight: 1
    },
    ownership: { default: 0 }
  })
}

export default createIncunable