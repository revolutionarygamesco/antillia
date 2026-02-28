import capitalize from './capital.ts'

describe('capitalize', () => {
  it('capitalizes a string', () => {
    expect(capitalize('the British Empire')).toBe('The British Empire')
  })
})
