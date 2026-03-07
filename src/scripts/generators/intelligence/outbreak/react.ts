import { type OutbreakReactionTag, type OutbreakReaction, type OutbreakStage } from './types.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'
import reactions from './reactions.ts'

const getReaction = (options: OutbreakReactionTag[]): OutbreakReaction => {
  const tag = selectRandomElement(options)
  const { effect } = reactions[tag]
  return { tag, effect: selectRandomBetween(...effect) }
}

const reactEarly = (): OutbreakReaction => {
  return getReaction(stockArray([
    { n: 3, item: 'ignore' },
    { n: 1, item: 'prayer' },
    { n: 1, item: 'fumigation' },
    { n: 1, item: 'quarantine' }
  ]))
}

const reactMid = (): OutbreakReaction => {
  return getReaction(stockArray([
    { n: 1, item: 'ignore' },
    { n: 1, item: 'prayer' },
    { n: 2, item: 'fumigation' },
    { n: 2, item: 'quarantine' },
    { n: 1, item: 'closure' }
  ]))
}

const reactLate = (): OutbreakReaction => {
  return getReaction(['prayer', 'fumigation', 'closure'])
}

const react = (): Record<OutbreakStage, OutbreakReaction> => {
  return {
    early: reactEarly(),
    mid: reactMid(),
    late: reactLate()
  }
}

export default react
