import localize from '../../../utilities/wrappers/localize.ts'
import shuffleArray from '../../../random/shuffle.ts'
import selectRandomElement from '../../../random/el.ts'
import { MODULE_ID } from '../../../settings.ts'

const fumigate = (): {
  fumigants: string[],
  volatile: boolean,
  fumigation: string
} => {
  const prefix = [MODULE_ID, 'intelligence', 'outbreak', 'fumigants']
  const num = selectRandomElement(['two', 'three'])
  const fumigants = shuffleArray(['sulphur', 'gunpowder', 'tar', 'tobacco', 'ash'])
    .slice(0, num === 'three' ? 3 : 2)

  const fumigant1 = localize([...prefix, fumigants[0]])
  const fumigant2 = localize([...prefix, fumigants[1]])
  const fumigant3 = fumigants.length > 2
    ? localize([...prefix, fumigants[0]])
    : ''
  const context = { fumigant1, fumigant2, fumigant3 }

  const volatile = fumigants.includes('ash')
  const volatileTag = volatile ? 'volatile' : 'regular'
  const fumigation = localize([...prefix, 'mix', num, volatileTag, num], context)

  return { fumigants, volatile, fumigation }
}

export default fumigate
