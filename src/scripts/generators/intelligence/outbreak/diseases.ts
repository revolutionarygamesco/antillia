import { type OutbreakDisease } from './types.ts'
import { UUIDS } from '../../../settings.ts'
import selectRandomElement from '../../../random/el.ts'

const diseases = new Map<string, OutbreakDisease>()

diseases.set('dysentery', {
  tag: 'dysentery',
  uuid: UUIDS.JOURNAL_FLUX,
  stages: {
    early: [1, 7],
    mid: [8, 28],
    late: [29, 49]
  }
})

diseases.set('smallpox', {
  tag: 'smallpox',
  uuid: UUIDS.JOURNAL_POX,
  stages: {
    early: [1, 21],
    mid: [22, 84],
    late: [85, 140]
  }
})

diseases.set('measles', {
  tag: 'measles',
  uuid: UUIDS.JOURNAL_MEASLES,
  stages: {
    early: [1, 10],
    mid: [11, 42],
    late: [43, 70]
  }
})

diseases.set('diphtheria', {
  tag: 'diphtheria',
  uuid: UUIDS.JOURNAL_BOULOGNE,
  stages: {
    early: [1, 10],
    mid: [11, 42],
    late: [43, 84]
  }
})

export const pickRandomOutbreakDisease = () => {
  return selectRandomElement([...diseases.values()])
}

export default diseases
