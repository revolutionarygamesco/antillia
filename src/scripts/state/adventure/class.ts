import {
  type AdventureChapterData,
  type AdventureStateData,
  isAdventureStateData
} from './data.ts'

import GameState from '../game/class.ts'
import CrewState from '../crew/class.ts'
import getLog from '../../log/get.ts'
import { MODULE_ID, ADVENTURE_STATE_FLAG } from '../../settings.ts'

class AdventureState {
  playing: string
  chapters: AdventureChapterData[]
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
    this.chapters = data?.chapters ?? [
      { n: 1, start: 0, end: null },
      { n: 2, start: null, end: null },
      { n: 3, start: null, end: null },
      { n: 4, start: null, end: null },
      { n: 5, start: null, end: null },
      { n: 6, start: null, end: null }
    ]
  }

  toObject (): AdventureStateData {
    return {
      playing: this.playing,
      chapters: this.chapters,
      history: this.history.map(state => state.toObject())
    }
  }

  serialize (): string {
    return JSON.stringify(this.toObject())
  }

  async save (): Promise<boolean> {
    try {
      const log = await getLog()
      if (!log?.setFlag) return false
      log.setFlag(MODULE_ID, ADVENTURE_STATE_FLAG, this.serialize())
      return true
    } catch (_err) { return false }
  }

  getChapter (seconds: number): AdventureChapterData {
    for (const chapter of this.chapters) {
      const { start, end } = chapter
      if (start === null) continue
      if (seconds >= start && (end === null || seconds <= end)) return chapter
    }

    return this.chapters[0]
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
      const log = await getLog()
      if (!log?.getFlag) return new AdventureState()
      const flag = log.getFlag(MODULE_ID, ADVENTURE_STATE_FLAG)
      const data = typeof flag === 'string' ? JSON.parse(flag) : flag
      return isAdventureStateData(data)
        ? new AdventureState(data)
        : new AdventureState()
    } catch (_err) { return new AdventureState() }
  }
}

export default AdventureState
