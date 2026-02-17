import { type GameStateData } from '../game/data.ts'

export interface AdventureStateData {
  playing: string
  history: GameStateData[]
}
