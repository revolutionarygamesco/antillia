import { primitives, getPrimitivesExcept } from '../../../utilities/testing/primitives.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import {
  outbreakReactionTags,
  outbreakStages,
  isOutbreakReactionTag,
  isOutbreakReactionTagArray,
  isOutbreakStage,
  isOutbreakStageArray,
  isOutbreakStageSpans,
  isOutbreakReaction,
  isOutbreakDisease,
  isOutbreakSituation
} from './types.ts'

describe('isOutbreakReactionTag', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakReactionTag(candidate)).toBe(false)
  })

  it.each(outbreakReactionTags)('accepts %s', (candidate) => {
    expect(isOutbreakReactionTag(candidate)).toBe(true)
  })
})

describe('isOutbreakReactionTagArray', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of strings', ['hello', 'world']],
    ['an array that contains reactions alongside other elements', ['ignore', 'hello']]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakReactionTagArray(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of outbreak reactions', ['ignore']]
  ] as Array<[string, unknown]>)('accepts %s', (_label, candidate) => {
    expect(isOutbreakReactionTagArray(candidate)).toBe(true)
  })
})

describe('isOutbreakReaction', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakReaction(candidate)).toBe(false)
  })

  it.each(outbreakReactionTags)('accepts a %s reaction', (tag) => {
    expect(isOutbreakReaction({ tag, effect: 0 })).toBe(true)
  })
})

describe('isOutbreakStage', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakStage(candidate)).toBe(false)
  })

  it.each(outbreakStages)('accepts %s', (candidate) => {
    expect(isOutbreakStage(candidate)).toBe(true)
  })
})

describe('isOutbreakStageArray', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of strings', ['hello', 'world']],
    ['an array that contains stages alongside other elements', ['early', 'hello']]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakStageArray(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of outbreak stages', ['early']]
  ] as Array<[string, unknown]>)('accepts %s', (_label, candidate) => {
    expect(isOutbreakStageArray(candidate)).toBe(true)
  })
})

describe('isOutbreakStageSpans', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakStageSpans(candidate)).toBe(false)
  })

  it('accepts an outbreak stage days record', () => {
    expect(isOutbreakStageSpans({
      early: [1, 7],
      mid: [8, 28],
      late: [29, 49]
    })).toBe(true)
  })
})

describe('isOutbreakDisease', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakDisease(candidate)).toBe(false)
  })

  it('accepts an outbreak stage record', () => {
    expect(isOutbreakDisease({
      tag: 'influenza',
      uuid: 'influenza',
      stages: {
        early: [1, 7],
        mid: [8, 28],
        late: [29, 49]
      }
    })).toBe(true)
  })
})

describe('isOutbreakSituation', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakSituation(candidate)).toBe(false)
  })

  it('accepts an outbreak situation', () => {
    expect(isOutbreakSituation({
      storyline: 'outbreak',
      location: 'kingston',
      disease: {
        tag: 'influenza',
        uuid: 'influenza',
        stages: {
          early: [1, 7],
          mid: [8, 28],
          late: [29, 49]
        }
      },
      course: {
        early: [SECONDS_PER_DAY, 7 * SECONDS_PER_DAY],
        mid: [8 * SECONDS_PER_DAY, 28 * SECONDS_PER_DAY],
        late: [29 * SECONDS_PER_DAY, 49 * SECONDS_PER_DAY]
      },
      reaction: { tag: 'ignore', effect: 10 }
    })).toBe(true)
  })
})
