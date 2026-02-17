import GameState from '../game/class.ts'
import CrewState from '../crew/class.ts'
import { type AdventureStateData, isAdventureStateData } from './data.ts'
import fromUuid from '../../utilities/wrappers/from-uuid.ts'
import { MODULE_ID, ADVENTURE_STATE_FLAG, UUIDS } from '../../settings.ts'

class AdventureState {
  playing: string
  history: GameState[]

  constructor(data?: AdventureState | AdventureStateData) {
    this.history = data
      ? data.history
          .map(item => {
            if (item instanceof GameState) return item
            return new GameState(
              item.at,
              item,
              ...item.crews.map(crew => new CrewState(crew))
            )
          })
          .sort((a, b) => a.at - b.at)
      : [new GameState()]

    this.playing = Array.from(this.history[this.history.length - 1].crews.keys())[0]
  }

  toObject (): AdventureStateData {
    return {
      playing: this.playing,
      history: this.history.map(state => state.toObject())
    }
  }

  serialize (): string {
    return JSON.stringify(this.toObject())
  }

  static deserialize (serialized: string): AdventureState | null {
    try {
      const data = JSON.parse(serialized)
      if (!isAdventureStateData(data)) return null
      return new AdventureState(data)
    } catch (_err) { return null }
  }

  static async load (): Promise<AdventureState> {
    try {
      const log = await fromUuid(UUIDS.LOG)
      if (!log?.getFlag) return new AdventureState()
      const data = log.getFlag(MODULE_ID, ADVENTURE_STATE_FLAG)
      if (!isAdventureStateData(data)) return new AdventureState()
      return new AdventureState(data)
    } catch (_err) { return new AdventureState() }
  }
}

export default AdventureState
