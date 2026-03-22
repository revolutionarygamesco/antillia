import AdventureState from '../state/adventure/class.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import selectRandomElement from '../random/el.ts'
import drawFirst from '../utilities/draw-first.ts'
import { UUIDS } from '../settings.ts'

const drawInfamousPirate = async (): Promise<Actor | JournalEntry> => {
  const state = await AdventureState.load()
  const uuids = Object.keys(state.exploits).filter(key => {
    const exploits = state.exploits.get(key)
    return exploits && exploits.check()
  })

  const actors: Actor[] = []
  for await (const uuid of uuids) {
    const actor = await fromUuid(uuid) as Actor | null
    if (actor) actors.push(actor)
  }

  const pc = actors.length > 0 ? selectRandomElement(actors) : null
  if (pc) return pc

  const result = await drawFirst(UUIDS.PIRATES)
  return await fromUuid(result?.documentUuid ?? UUIDS.JOURNAL_BLACK_BART)
}

export default drawInfamousPirate
