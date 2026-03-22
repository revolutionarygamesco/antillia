import selectRandomElement from '../../random/el.ts'
import stockArray from '../../random/stock.ts'

const isGuineaman = (
  established: Record<string, any>,
  historical: boolean,
  requested?: boolean
): boolean => {
  if (!historical) return false
  if (established.pirate) return false
  if (!['Merchant', undefined].includes(established.use)) return false
  if (requested !== undefined) return requested
  return selectRandomElement(stockArray([
    { n: 19, item: false },
    { n: 1, item: true }
  ]))
}

export default isGuineaman
