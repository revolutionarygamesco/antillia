import fromUuid from './wrappers/from-uuid.ts'
import { UUIDS } from '../settings.ts'

export interface AdventureVersion {
  tag: string
  premium: boolean
  historical: boolean
}

export const hasPremium = (): boolean => {
  if (!game) return false
  return Boolean(game.modules?.get('pirate-borg-premium'))
}

const checkVersion = async (): Promise<AdventureVersion> => {
  const fallback: AdventureVersion = { tag: 'demo', premium: hasPremium(), historical: false }
  try {
    const page = await fromUuid(UUIDS.INTRO)
    if (typeof page?.text?.content !== 'string') return fallback

    const parser = new DOMParser()
    const doc = parser.parseFromString(page.text.content, 'text/html')
    const div = doc.getElementById('version-info')
    const tag = div?.dataset.version
    if (!tag) return fallback

    switch (tag) {
      case 'premiumHistorical': return { tag, premium: true, historical: true }
      case 'premium': return { tag, premium: true, historical: false }
      case 'historical': return { tag, premium: false, historical: true }
      default: return {tag, premium: false, historical: true}
    }
  } catch (_err) {
    return fallback
  }
}

export default checkVersion
