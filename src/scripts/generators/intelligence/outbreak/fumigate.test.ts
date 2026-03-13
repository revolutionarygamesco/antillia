import { MODULE_ID } from '../../../settings.ts'
import selectFumigants from './fumigate.ts'

describe('selectFumigants', () => {
  it('selects two or three fumigants', () => {
    const { fumigants } = selectFumigants()
    expect([2, 3]).toContain(fumigants.length)
  })

  it('marks the mix as volatile if it contains ash', () => {
    const { fumigants, volatile } = selectFumigants()
    expect(volatile).toBe(fumigants.includes('ash'))
  })

  it('describes the mix', () => {
    const { fumigation } = selectFumigants()
    expect(fumigation).toContain(`${MODULE_ID}.intelligence.outbreak.fumigants.mix`)
  })
})
