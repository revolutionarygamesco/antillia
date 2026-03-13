import { type OutbreakReactionTag, type OutbreakReaction } from './types.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import reactions from './reactions.ts'

const react = (): OutbreakReaction => {
  const tag: OutbreakReactionTag = selectRandomElement(stockArray([
    { n: 3, item: 'ignore' },
    { n: 1, item: 'prayer' },
    { n: 1, item: 'fumigation' },
    { n: 1, item: 'quarantine' }
  ]) as OutbreakReactionTag[])

  const { effect } = reactions[tag]
  return { tag, effect: selectRandomBetween(...effect) }
}

export default react
