import CrewState from '../crew/class.ts'
import { type CrewStateData } from '../crew/data.ts'

export interface GameStateData {
  at: number
  chapter: number
  crews: CrewStateData[]
}

class GameState {
  at: number
  chapter: number
  crews: Map<string, CrewState>

  constructor (
    at: number = 0,
    prev?: GameState,
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
}

export default GameState
