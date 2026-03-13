import { type OutbreakSituation, isOutbreakSituation } from './types.ts'
import getPayloads from '../../../log/get-payloads.ts'

const checkExistingOutbreak = async (
  location: string
): Promise<OutbreakSituation | null> => {
  const payloads = await getPayloads(isOutbreakSituation, { location })
  return payloads.length < 1
    ? null
    : payloads[payloads.length - 1]
}

export default checkExistingOutbreak
