import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

export const getUpgradeNode = (upgrade: string, premium: boolean): string => {
  if (upgrade !== 'undead') return upgrade
  return premium ? 'undead.premium' : 'undead.base'
}

const writeFortUpgradeReport = (
  fort: TableResult,
  upgrade: string,
  premium: boolean = false
): string => {
  const prefix = [MODULE_ID, 'intelligence', 'fort-upgrades']
  const ev = selectRandomElement(['verified', 'observation', 'money', 'heard'])
  const evidence = localize([...prefix, 'evidence', ev])
  const agent = selectRandomBetween(1, 50)
  const node = getUpgradeNode(upgrade, premium)
  return localize([...prefix, 'upgrade', node], { fort, agent, evidence })
}

export default writeFortUpgradeReport
