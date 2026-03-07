import { type OutbreakReactionTag } from './types.ts'

export interface OutbreakReactionData {
  tag: OutbreakReactionTag
  effect: [number, number]
}

const reactions: Record<OutbreakReactionTag, OutbreakReactionData> = {
  ignore: { tag: 'ignore', effect: [0, 0] },
  prayer: { tag: 'prayer', effect: [0, 0] },
  fumigation: { tag: 'fumigation', effect: [-5, -10] },
  quarantine: { tag: 'quarantine', effect: [-10, -20] },
  closure: { tag: 'closure', effect: [-15, -30] },
}

export default reactions
