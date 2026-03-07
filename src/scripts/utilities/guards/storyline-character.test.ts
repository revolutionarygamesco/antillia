import { primitives, getPrimitivesExcept } from '../testing/primitives.ts'
import isStorylineCharacter, { isStorylineCharacterArray } from './storyline-character.ts'

describe('isStorylineCharacter', () => {
  it.each([
    ...primitives
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isStorylineCharacter(candidate)).toBe(false)
  })

  it('accepts a storyline character', () => {
    expect(isStorylineCharacter({
      name: 'John Doe',
      uuid: 'JournalEntry.xyz',
      tag: 'tester'
    })).toBe(true)
  })

  it('accepts a storyline character with a date', () => {
    expect(isStorylineCharacter({
      name: 'John Doe',
      uuid: 'JournalEntry.xyz',
      tag: 'tester',
      date: 0
    })).toBe(true)
  })
})

describe('isStorylineCharacterArray', () => {
  it.each([
    ...getPrimitivesExcept('an array')
  ] as Array<[string, unknown]>)('rejects %s', (_label, candidate) => {
    expect(isStorylineCharacterArray(candidate)).toBe(false)
  })

  it('rejects a storyline character', () => {
    expect(isStorylineCharacterArray({
      name: 'John Doe',
      uuid: 'JournalEntry.xyz',
      tag: 'tester'
    })).toBe(false)
  })

  it('accepts an empty array', () => {
    expect(isStorylineCharacterArray([])).toBe(true)
  })

  it('accepts an array of storyline characters', () => {
    expect(isStorylineCharacterArray([{
      name: 'John Doe',
      uuid: 'JournalEntry.xyz',
      tag: 'tester'
    }])).toBe(true)
  })
})
