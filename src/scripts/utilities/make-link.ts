const makeLink = (doc: Document): string => {
  const { name } = doc
  const uuid = (doc as TableResult).documentUuid ?? doc.uuid()
  return `@UUID[${uuid}]{${name}}`
}

export default makeLink
