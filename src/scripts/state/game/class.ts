import CrewState from '../crew/class.ts'
import { type GameStateData, isGameStateData } from './data.ts'

class GameState {
  at: number
  chapter: number
  crews: Map<string, CrewState>

  constructor (
    at: number = 0,
    prev?: GameState | GameStateData,
    ...crews: CrewState[]
  ) {
    this.at = at
    this.chapter = prev?.chapter ?? 1
    this.crews = new Map<string, CrewState>()
    for (const crew of crews) this.crews.set(crew.id, crew)

    // If we're starting a new adventure, add a crew to start with.
    if (at === 0 && this.crews.size === 0) {
      const init = new CrewState()
      this.crews.set(init.id, init)
    }
  }

  toObject (): GameStateData {
    return {
      at: this.at,
      chapter: this.chapter,
      crews: Array.from(this.crews.values()).map(crew => crew.toObject())
    }
  }

  serialize (): string {
    return JSON.stringify(this.toObject())
  }

  static deserialize(serialized: string): GameState | null {
    try {
      const data = JSON.parse(serialized)
      if (!isGameStateData(data)) return null
      const obj = data as GameStateData

      const crews = obj.crews
        .map(data => new CrewState(data))

      return new GameState(obj.at, obj, ...crews)
    } catch (_err) { return null }
  }
}

export default GameState
