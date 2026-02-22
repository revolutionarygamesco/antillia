import generateReportAge from './age.ts'

describe('generateReportAge', () => {
  it('returns a number between 10 and 700', () => {
    const days = generateReportAge()
    expect(days).toBeGreaterThanOrEqual(10)
    expect(days).toBeLessThanOrEqual(700)
  })
})
