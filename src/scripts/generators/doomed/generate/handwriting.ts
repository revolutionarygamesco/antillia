import type { DoomedHandwriting } from '../types.ts'
import type { EmpireData } from '../../../random/empires.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID } from '../../../settings.ts'

const getHandwriting = (
  empire: EmpireData,
): DoomedHandwriting => {
  const lang = localize([MODULE_ID, 'factions', empire.tag, 'lang'])
  const physical = selectRandomElement(['hurried', 'cramped', 'jagged',
    'lurching', 'unsteady', 'trembling', 'sloping'])
  const emotional = selectRandomElement(['frantic', 'desperate', 'deliberate',
    'resolute', 'faltering'])
  return { lang, physical, emotional }
}

export default getHandwriting
