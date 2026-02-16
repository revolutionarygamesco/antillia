import selectRandomElement from '../random/el.ts'

const numbers = '0123456789'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = lower.toUpperCase()
const chars = (upper + lower + numbers).split('')

const generateID = (): string => {
  let id = ''
  while (id.length < 16) id += selectRandomElement(chars)
  return id
}

export default generateID
