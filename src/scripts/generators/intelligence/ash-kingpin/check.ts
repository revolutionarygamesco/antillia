import { type AshKingpinStoryline, isAshKingpinStoryline } from './type.ts'
import readLog from '../../../log/read.ts'

const checkExistingKingpin = async (
  location: string
): Promise<AshKingpinStoryline | null> => {
  const payloads = (await readLog())
    .sort((a, b) => a.at - b.at)
    .map(entry => entry.payload)
    .filter(payload => isAshKingpinStoryline(payload))
    .filter(payload => payload.location === location)
  return payloads.length < 1
    ? null
    : payloads[payloads.length - 1]
}

export default checkExistingKingpin
