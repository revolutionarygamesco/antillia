import type { UprisingSituation } from './types.ts'
import stockArray from '../../../random/stock.ts'

const getSituations = (
  isPremium: boolean = false
): UprisingSituation[] => {
  const cult = isPremium ? 'cult.premium' : 'cult.base'
  const necrosmith = isPremium ? 'necrosmith.premium' : 'necrosmith.base'

  const sea: UprisingSituation = {
    tag: 'sea',
    twists: stockArray([
      { n: 2, item: cult },
      { n: 1, item: 'priest' },
      { n: 1, item: 'priestess' },
      { n: 2, item: 'warlord' },
      { n: 1, item: 'prince' },
      { n: 1, item: 'princess' }
    ]),
    alarm: 1
  }

  const transfer: UprisingSituation = {
    tag: 'transfer',
    twists: stockArray([
      { n: 2, item: cult },
      { n: 1, item: 'priest' },
      { n: 1, item: 'priestess' },
      { n: 2, item: 'warlord' },
      { n: 1, item: 'prince' },
      { n: 1, item: 'princess' }
    ]),
    alarm: 1
  }

  const plantation: UprisingSituation = {
    tag: 'plantation',
    twists: stockArray([
      { n: 2, item: cult },
      { n: 2, item: necrosmith },
      { n: 1, item: 'priest' },
      { n: 1, item: 'priestess' },
      { n: 2, item: 'forger' },
      { n: 2, item: 'warlord' },
      { n: 1, item: 'prince' },
      { n: 1, item: 'princess' }
    ]),
    alarm: 1
  }

  const maroons: UprisingSituation = {
    tag: 'maroons',
    twists: stockArray([
      { n: 2, item: necrosmith },
      { n: 1, item: 'priest' },
      { n: 1, item: 'priestess' },
      { n: 2, item: 'forger' },
      { n: 2, item: 'warlord' },
      { n: 1, item: 'prince' },
      { n: 1, item: 'princess' }
    ]),
    alarm: 1
  }

  const rebellion: UprisingSituation = {
    tag: 'rebellion',
    twists: stockArray([
      { n: 2, item: cult },
      { n: 2, item: necrosmith },
      { n: 1, item: 'priest' },
      { n: 1, item: 'priestess' },
      { n: 2, item: 'forger' },
      { n: 2, item: 'warlord' },
      { n: 1, item: 'prince' },
      { n: 1, item: 'princess' }
    ]),
    alarm: 1
  }

  return stockArray([
    { n: 2, item: sea },
    { n: 2, item: transfer },
    { n: 6, item: plantation },
    { n: 2, item: maroons },
    { n: 1, item: rebellion },
  ])
}

export default getSituations
