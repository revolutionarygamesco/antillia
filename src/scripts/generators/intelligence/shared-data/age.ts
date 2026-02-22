import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import stockArray from '../../../random/stock.ts'

const generateReportAge = (): number => {
  const fresh: [number, number] = [10, 30]
  const dated: [number, number] = [30, 90]
  const old: [number, number] = [90, 700]

  return selectRandomBetween(...selectRandomElement(stockArray([
    { n: 1, item: fresh },
    { n: 2, item: dated },
    { n: 3, item: old }
  ])))
}

export default generateReportAge
