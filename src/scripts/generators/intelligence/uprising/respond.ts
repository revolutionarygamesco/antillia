import selectRandomElement from '../../../random/el.ts'

export const UPRISING_MILITARY_RESPONSE_THRESHOLD = 3
export const lesserResponses = ['patrols', 'lockdown', 'bounties']

const respond = (
  start: number = 0,
  add: number = 1
): string => {
  if (start + add < UPRISING_MILITARY_RESPONSE_THRESHOLD) return selectRandomElement(lesserResponses)
  return add >= UPRISING_MILITARY_RESPONSE_THRESHOLD ? 'emergency' : 'threshold'
}

export default respond
