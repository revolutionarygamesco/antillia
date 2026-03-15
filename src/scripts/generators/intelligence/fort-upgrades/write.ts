import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import makeLink from '../../../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../../../settings.ts'

const writeFortUpgradeReport = (
  fort: TableResult,
  upgrade: string,
  lang: string,
  isPremium: boolean = false
): string => {
  const prefix = [MODULE_ID, 'intelligence', 'fort-upgrades']
  const ev = selectRandomElement(['verified', 'observation', 'money', 'heard'])
  const evidence = localize([...prefix, 'evidence', ev])
  const agent = (selectRandomBetween(1, 50)).toString()
  const context: Record<string, string> = { fort: makeLink(fort), lang, agent, evidence }
  const skeletons = localize([...prefix, 'upgrade', 'skeletons'])
  context.skeletons = isPremium
    ? makeLink({ name: skeletons, uuid: UUIDS.PREMIUM_SKELETON })
    : skeletons
  return localize([...prefix, 'upgrade', upgrade], context)
}

export default writeFortUpgradeReport
