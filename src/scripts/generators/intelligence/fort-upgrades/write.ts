import selectFort from './select-fort.ts'
import selectRandomBetween from '../../../random/between.ts'
import selectRandomElement from '../../../random/el.ts'
import localize from '../../../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../../../settings.ts'

const writeFortUpgradeReport = async (
  premium: boolean = false
): Promise<string> => {
  const fort = await selectFort()
  const agent = selectRandomBetween(1, 50)
  const prefix = [MODULE_ID, 'intelligence', 'fort-upgrades']
  const ev = selectRandomElement(['verified', 'observation', 'money', 'heard'])
  const evidence = localize([...prefix, 'evidence', ev])
  const undead = premium ? 'undead.premium' : 'undead.base'
  const upgrade = selectRandomElement(['tunnels', 'expansion', 'armor', undead])
  return localize([...prefix, 'upgrade', upgrade], { fort, agent, evidence })
}

export default writeFortUpgradeReport
