import GameState from '../game/class.ts'
import { type AdventureStateData } from './data.ts'
import CrewState from '../crew/class.ts'

class AdventureState {
  playing: string
  history: GameState[]

  constructor(data?: AdventureState | AdventureStateData) {
    this.history = data
      ? data.history
          .map(item => {
            if (item instanceof GameState) return item
            return new GameState(item.at, item, ...item.crews.map(crew => new CrewState(crew)))
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
}

export default AdventureState
