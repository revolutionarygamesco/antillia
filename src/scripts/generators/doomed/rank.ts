import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'

const getAuthorRank = (): string => {
  return selectRandomElement(stockArray([
    { n: 1, item: 'captain' },
    { n: 1, item: 'bosun' },
    { n: 1, item: 'master' },
    { n: 1, item: 'purser' },
    { n: 6, item: 'sailor' },
    { n: 2, item: 'cook' }
  ]))
}

export default getAuthorRank
