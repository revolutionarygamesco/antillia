import stockArray from '../../../random/stock.ts'
import { MODULE_ID } from '../../../settings.ts'

const prefix = [MODULE_ID, 'intelligence', 'spies']

interface Gender {
  naming: 'Masculine' | 'Feminine'
  sub: 'he' | 'she'
  obj: 'him' | 'her'
  pos: 'his' | 'her'
}

export interface Position {
  path: string[]
  genders: Gender[]
  needs: string[]
}

const f: Gender = { naming: 'Feminine', sub: 'she', obj: 'her', pos: 'her' }
const m: Gender = { naming: 'Masculine', sub: 'he', obj: 'him', pos: 'his' }

export const positions: Array<Position | Position[]> = [
  { path: [...prefix, 'candidates', 'merchant'], genders: [m], needs: ['port'] },
  { path: [...prefix, 'candidates', 'servant'], genders: [m, f], needs: ['governor'] },
  { path: [...prefix, 'candidates', 'tavern'], genders: [m], needs: ['port'] },
  [
    { path: [...prefix, 'candidates', 'secretary'], genders: [m], needs: ['governor'] },
    { path: [...prefix, 'candidates', 'pilot'], genders: [m], needs: ['port'] },
    { path: [...prefix, 'candidates', 'port-master'], genders: [m], needs: ['port'] },
    { path: [...prefix, 'candidates', 'official'], genders: [m], needs: ['port'] },
    { path: [...prefix, 'candidates', 'physician', 'personal'], genders: [m], needs: ['governor'] },
    { path: [...prefix, 'candidates', 'physician', 'regimental'], genders: [m], needs: ['fort'] },
    { path: [...prefix, 'candidates', 'customs'], genders: [m], needs: ['port'] },
    { path: [...prefix, 'candidates', 'army'], genders: [m], needs: ['fort'] },
    { path: [...prefix, 'candidates', 'navy'], genders: [m], needs: ['navy'] },
    { path: [...prefix, 'candidates', 'interpreter'], genders: [m], needs: ['governor'] },
  ]
]

export const rewards: string[][] = stockArray([
  { n: 4, item: [...prefix, 'motivation', 'reward', 'money'] },
  { n: 2, item: [...prefix, 'motivation', 'reward', 'pardon'] },
  { n: 1, item: [...prefix, 'motivation', 'reward', 'promise', 'fulfilled'] },
  { n: 1, item: [...prefix, 'motivation', 'reward', 'promise', 'unfulfilled'] }
])

export const baseCoercion: string[][] = [
  [...prefix, 'motivation', 'coercion', 'affair'],
  [...prefix, 'motivation', 'coercion', 'illegitimate', 'son'],
  [...prefix, 'motivation', 'coercion', 'illegitimate', 'daughter'],
  [...prefix, 'motivation', 'coercion', 'threatened', 'son'],
  [...prefix, 'motivation', 'coercion', 'threatened', 'daughter'],
  [...prefix, 'motivation', 'coercion', 'threatened', 'mother'],
  [...prefix, 'motivation', 'coercion', 'threatened', 'father']
]

export const historicalCoercion: string[][] = [
  [...prefix, 'motivation', 'coercion', 'homosexual']
]

export const ego: string[][] = [
  [...prefix, 'motivation', 'ego', 'grievance'],
  [...prefix, 'motivation', 'ego', 'thrill'],
  [...prefix, 'motivation', 'ego', 'vanity'],
  [...prefix, 'motivation', 'ego', 'validation']
]

export const ideology: Record<string, Record<string, string[][]>> = {
  spanish: {
    british: [
      [...prefix, 'motivation', 'ideology', 'spanish', 'british', 'protestant'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'british', 'trade'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'british', 'intellectual']
    ],
    french: [
      [...prefix, 'motivation', 'ideology', 'spanish', 'french', 'catholic'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'french', 'francophile'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'french', 'corruption']
    ],
    dutch: [
      [...prefix, 'motivation', 'ideology', 'spanish', 'dutch', 'trade'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'dutch', 'religious'],
      [...prefix, 'motivation', 'ideology', 'spanish', 'dutch', 'intellectual']
    ]
  },
  british: {
    spanish: [
      [...prefix, 'motivation', 'ideology', 'british', 'spanish', 'catholic'],
      [...prefix, 'motivation', 'ideology', 'british', 'spanish', 'jacobite'],
      [...prefix, 'motivation', 'ideology', 'british', 'spanish', 'illegal']
    ],
    french: [
      [...prefix, 'motivation', 'ideology', 'british', 'french', 'jacobite'],
      [...prefix, 'motivation', 'ideology', 'british', 'french', 'francophile'],
      [...prefix, 'motivation', 'ideology', 'british', 'french', 'leveller']
    ],
    dutch: [
      [...prefix, 'motivation', 'ideology', 'british', 'dutch', 'trade'],
      [...prefix, 'motivation', 'ideology', 'british', 'dutch', 'religious'],
      [...prefix, 'motivation', 'ideology', 'british', 'dutch', 'aristocrat']
    ]
  },
  french: {
    spanish: [
      [...prefix, 'motivation', 'ideology', 'french', 'spanish', 'catholic'],
      [...prefix, 'motivation', 'ideology', 'french', 'spanish', 'unionist'],
      [...prefix, 'motivation', 'ideology', 'french', 'spanish', 'bull']
    ],
    british: [
      [...prefix, 'motivation', 'ideology', 'french', 'british', 'lockean'],
      [...prefix, 'motivation', 'ideology', 'french', 'british', 'tolerance'],
      [...prefix, 'motivation', 'ideology', 'french', 'british', 'intellectual']
    ],
    dutch: [
      [...prefix, 'motivation', 'ideology', 'french', 'dutch', 'republican'],
      [...prefix, 'motivation', 'ideology', 'french', 'dutch', 'tolerance'],
      [...prefix, 'motivation', 'ideology', 'french', 'dutch', 'trade']
    ]
  },
  dutch: {
    spanish: [
      [...prefix, 'motivation', 'ideology', 'dutch', 'spanish', 'usurper'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'spanish', 'morality'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'spanish', 'commerce']
    ],
    british: [
      [...prefix, 'motivation', 'ideology', 'dutch', 'british', 'corruption'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'british', 'recompense'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'british', 'religion']
    ],
    french: [
      [...prefix, 'motivation', 'ideology', 'dutch', 'french', 'francophile'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'french', 'monarchist'],
      [...prefix, 'motivation', 'ideology', 'dutch', 'french', 'catholic']
    ]
  }
}
