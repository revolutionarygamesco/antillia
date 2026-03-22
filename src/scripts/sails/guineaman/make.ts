import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'

const makeGuineaman = (
  established: Record<string, any>
): void => {
  established.type = 'Frigate'

  const upgrades = established.upgrades ?? []
  established.upgrades = selectRandomElement(stockArray([
    { n: 2, item: [...upgrades, 'sails'] },
    { n: 1, item: upgrades }
  ]))

  const slavers = stockArray([
    { n: 13, item: 'British' },
    { n: 4, item: 'French' },
    { n: 3, item: 'Dutch' }
  ])

  if (!slavers.includes(established.nationality)) {
    established.nationality = selectRandomElement(slavers)
  }
}

export default makeGuineaman
