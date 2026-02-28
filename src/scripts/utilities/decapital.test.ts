import decapitalize from './decapital.ts'

describe('decapitalize', () => {
  it('decapitalizes a string', () => {
    expect(decapitalize('The British Empire')).toBe('the British Empire')
  })
})
