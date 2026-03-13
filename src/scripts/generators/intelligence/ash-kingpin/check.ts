import { type AshKingpinStoryline, isAshKingpinStoryline } from './type.ts'
import getPayloads from '../../../log/get-payloads.ts'

const checkExistingKingpin = async (
  location: string
): Promise<AshKingpinStoryline | null> => {
  const payloads = await getPayloads(isAshKingpinStoryline, { location })
  return payloads.length < 1
    ? null
    : payloads[payloads.length - 1]
}

export default checkExistingKingpin
