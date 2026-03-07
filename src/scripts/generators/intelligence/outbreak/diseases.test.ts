import { isOutbreakDisease } from './types.ts'
import { pickRandomOutbreakDisease } from './diseases.ts'

describe('pickRandomOutbreakDisease', () => {
  it('returns an outbreak disease', () => {
    expect(isOutbreakDisease(pickRandomOutbreakDisease())).toBe(true)
  })
})
