import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { parse, stringify } from 'yaml'

const isObject = (obj) => typeof obj === 'object' && obj !== null

const read = (path) => {
  const raw = readFileSync(path, 'utf8')
  return parse(raw)
}

const expand = (compact) => {
  if (Array.isArray(compact)) return compact.map(item => expand(item))
  if (!isObject(compact)) return compact

  if (compact.hasOwnProperty('flatten')) {
    return compact.flatten.flatMap(item => expand(item))
  }

  if (compact.hasOwnProperty('include')) {
    const included = read(compact.include)
    const { include, ...rest } = compact
    if (Array.isArray(included)) return expand(included)
    return expand(Object.assign({}, rest, included))
  }

  const expanded = structuredClone(compact)
  for (const key in compact) {
    expanded[key] = expand(expanded[key])
  }
  return expanded
}

const dir = `./src/packs/demo/adventure`
const str = stringify(expand(read('./src/packs/demo/index.yaml')))
mkdirSync(dir, { recursive: true })
writeFileSync([dir, 'index.yaml'].join('/'), str, 'utf8')
