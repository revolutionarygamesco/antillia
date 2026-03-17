import checkVersion from '../../../utilities/check-version.ts'
import getContext from '../context/get.ts'
import getDoomedSituation from './situation.ts'
import getTime from '../../../time/get.ts'
import generateDoomedMessageItem from './item.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const generateDoomedBottleMessage = async (): Promise<BottleMessage> => {
  const at = getTime()
  const { premium } = await checkVersion()
  const situation = await getDoomedSituation()
  const context = await getContext(at, situation)
  const item = await generateDoomedMessageItem(context, situation)
  const prefix = [MODULE_ID, 'last-accounts', 'description']

  const mapKey = premium ? 'premium' : 'base'
  const map = localize([...prefix, 'map', mapKey], context)
  const page = localize([...prefix, 'page'], context)
  const haunted = localize([...prefix, 'haunted', 'text'], context)

  const additional: string[] = [page]
  if (situation.includeMap) additional.push(map)
  if (situation.isHaunted) additional.push(haunted)

  return {
    contents: [item],
    additional: additional.join('\n')
  }
}

export default generateDoomedBottleMessage
