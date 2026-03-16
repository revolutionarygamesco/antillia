import type { DoomedHandwriting } from './types'
import selectRandomElement from '../../random/el.ts'

const getHandwriting = (): DoomedHandwriting => {
  const physical = selectRandomElement(['hurried', 'cramped', 'jagged',
    'lurching', 'unsteady', 'trembling', 'sloping'])
  const emotional = selectRandomElement(['frantic', 'desperate', 'deliberate',
    'resolute', 'faltering'])
  return { physical, emotional }
}

export default getHandwriting
