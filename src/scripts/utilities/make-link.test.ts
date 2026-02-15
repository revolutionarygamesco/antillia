import { describe, it, expect } from '@jest/globals'
import makeLink from './make-link.ts'

describe('makeLink', () => {
  it('makes a link', () => {
    const uuid = 'swgzi8mEAgfLJOEk'
    const name = 'Kingston'
    const actual = makeLink({ uuid: () => uuid, name } as Document)
    expect(actual).toBe(`@UUID[${uuid}]{${name}}`)
  })

  it('links to the document if provided', () => {
    const uuid = 'swgzi8mEAgfLJOEk'
    const name = 'Fort Charles'
    const documentUuid = `JournalEntry.${uuid}.JournalEntryPage.zPBtUYuNIxPTAZ1z`
    const actual = makeLink({ uuid: () => uuid, name, documentUuid } as TableResult)
    expect(actual).toBe(`@UUID[${documentUuid}]{${name}}`)
  })
})
