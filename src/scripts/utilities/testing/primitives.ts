export const primitives = [
  ['null', null],
  ['undefined', undefined],
  ['a function', () => {}],
  ['true', true],
  ['false', false],
  ['a string', 'a string'],
  ['a number', 42],
  ['an array', []],
  ['an empty object', {}],
] as Array<[string, any]>

export const getPrimitivesExcept = (...exceptions: string[]): Array<[string, any]> => {
  return primitives.filter(([label, _]) => {
    return !exceptions.includes(label)
  })
}
