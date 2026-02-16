import CrewState from './crew.ts'

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
    this.crews = prev?.crews ?? new Map<string, CrewState>()
    for (const crew of crews) this.crews.set(crew.id, crew)

    // If we're starting a new adventure, add a crew to start with.
    if (at === 0 && this.crews.size === 0) {
      const init = new CrewState()
      this.crews.set(init.id, init)
    }
  }
}

export default GameState
