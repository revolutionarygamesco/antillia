import { type OutbreakReaction } from './types.ts'
import diseases from './diseases.ts'
import getStageDuration from './stage-duration.ts'
import calculateOnset from './onset.ts'

describe('calculateOnset', () => {
  const disease = diseases.get('dysentery')!
  const ignore: OutbreakReaction = { tag: 'ignore', effect: 0 }
  const early = getStageDuration(disease, 'early', ignore)
  const mid = getStageDuration(disease, 'mid', ignore)
  const total = early + mid

  it('calculates the onset of an outbreak', () => {
    const onset = calculateOnset(disease, 0, 'mid', ignore)
    expect(onset).toBeGreaterThanOrEqual(total * -1)
    expect(onset).toBeLessThan(1)
  })
})
