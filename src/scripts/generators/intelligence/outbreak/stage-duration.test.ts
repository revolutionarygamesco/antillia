import { type OutbreakStage, type OutbreakReaction } from './types.ts'
import diseases from './diseases.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import getStageDuration from './stage-duration.ts'

describe('getStageDuration', () => {
  const disease = diseases.get('dysentery')!
  const ignore: OutbreakReaction = { tag: 'ignore', effect: 0 }
  const quarantine: OutbreakReaction = { tag: 'quarantine', effect: -15 }

  it.each([
    [7, 'early'],
    [21, 'mid'],
    [21, 'late']
  ] as Array<[number, OutbreakStage]>)('returns %d days for %s', (expected, stage) => {
    expect(getStageDuration(disease, stage, ignore)).toBe(expected * SECONDS_PER_DAY)
  })

  it.each([
    [7, 'early'],
    [6, 'mid'],
    [6, 'late']
  ] as Array<[number, OutbreakStage]>)('returns %d days for %s under quarantine)', (expected, stage) => {
    expect(getStageDuration(disease, stage, quarantine)).toBe(expected * SECONDS_PER_DAY)
  })
})
