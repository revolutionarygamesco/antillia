import shuffleArray from './shuffle.ts'

describe('shuffleArray', () => {
  it('shuffles the array', () => {
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const shuffled = shuffleArray<number>(arr)
    expect(arr.every(n => shuffled.includes(n))).toBe(true)
  })
})
