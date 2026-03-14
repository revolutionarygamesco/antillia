import respond, { lesserResponses } from './respond.ts'

describe('respond', () => {
  it.each([
    [0, 1],
    [0, 2],
    [1, 1]
  ] as Array<[number, number]>)('returns patrols, lockdown, or bounties if starting at %d and adding %d', (start, add) => {
    expect(lesserResponses).toContain(respond(start, add))
  })

  it.each([
    [1, 2],
    [2, 1]
  ] as Array<[number, number]>)('returns threshold if starting at %d and adding %d', (start, add) => {
    expect(respond(start, add)).toBe('threshold')
  })

  it('returns emergency if event is 3 or greater', () => {
    expect(respond(0, 3)).toBe('emergency')
  })
})
