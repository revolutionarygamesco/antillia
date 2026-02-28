import parseHTML from './parse-html.ts'

describe('parseHTML', () => {
  it('parses an HTML string into a queryable document', () => {
    const doc = parseHTML('<p id="test">Hello</p>')
    expect(doc.querySelector('#test')?.textContent).toBe('Hello')
  })
})
