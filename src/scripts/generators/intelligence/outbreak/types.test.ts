import { primitives, getPrimitivesExcept } from '../../../utilities/testing/primitives.ts'
import { SECONDS_PER_DAY } from '../../../settings.ts'
import {
  isOutbreakReaction, isOutbreakReactionArray, outbreakReactions,
  isOutbreakTwist, isOutbreakTwistArray, outbreakTwists,
  isOutbreakStage, isOutbreakStageArray, outbreakStages,
  isOutbreakStageSpans, isOutbreakStageReactions, isOutbreakStageTwists,
  isOutbreakDisease, isOutbreakSituation
} from './types.ts'

describe('isOutbreakReaction', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakReaction(candidate)).toBe(false)
  })

  it.each(outbreakReactions)('accepts %s', (candidate) => {
    expect(isOutbreakReaction(candidate)).toBe(true)
  })
})

describe('isOutbreakReactionArray', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of strings', ['hello', 'world']],
    ['an array that contains reactions alongside other elements', ['ignore', 'hello']]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakReactionArray(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of outbreak reactions', ['ignore']]
  ] as Array<[string, unknown]>)('accepts %s', (_label, candidate) => {
    expect(isOutbreakReactionArray(candidate)).toBe(true)
  })
})

describe('isOutbreakTwist', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakTwist(candidate)).toBe(false)
  })

  it.each(outbreakTwists)('accepts %s', (candidate) => {
    expect(isOutbreakTwist(candidate)).toBe(true)
  })
})

describe('isOutbreakTwistArray', () => {
  it.each([
    ...getPrimitivesExcept('an array'),
    ['an array of strings', ['hello', 'world']],
    ['an array that contains twists alongside other elements', ['healer', 'hello']]
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakTwistArray(candidate)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of outbreak twists', ['faith-healer']]
  ] as Array<[string, unknown]>)('accepts %s', (_label, candidate) => {
    expect(isOutbreakTwistArray(candidate)).toBe(true)
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

describe('isOutbreakStageReactions', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakStageReactions(candidate)).toBe(false)
  })

  it('accepts an outbreak stage reactions record', () => {
    expect(isOutbreakStageReactions({
      early: 'ignore',
      mid: 'fumigation',
      late: 'quarantine'
    })).toBe(true)
  })
})

describe('isOutbreakStageTwists', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isOutbreakStageTwists(candidate)).toBe(false)
  })

  it('accepts an outbreak stage twists record', () => {
    expect(isOutbreakStageTwists({
      early: 'faith-healer',
      mid: 'doctor',
      late: 'witch-hunt'
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
      reactions: {
        early: 'ignore',
        mid: 'fumigation',
        late: 'quarantine'
      },
      twists: {
        early: 'faith-healer',
        mid: 'doctor',
        late: 'witch-hunt'
      }
    })).toBe(true)
  })
})
