import selectRandomBetween from './between.ts'

const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = selectRandomBetween(0, i)
    const tmp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = tmp
  }

  return shuffled
}

export default shuffleArray
