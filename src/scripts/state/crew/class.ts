import generateID from '../../utilities/generate-id.ts'
import { type CrewStateData, type CrewPosition, isCrewStateData } from './data.ts'

class CrewState {
  id: string
  positions: Map<string, CrewPosition>

  constructor(data?: Partial<CrewStateData>) {
    this.id = typeof data?.id === 'string' ? data.id : generateID()
    this.positions = data?.positions
      ? new Map<string, CrewPosition>(Object.entries(data.positions))
      : new Map<string, CrewPosition>()
  }

  toObject (): CrewStateData {
    return {
      id: this.id,
      positions: Object.fromEntries(this.positions)
    }
  }

  serialize (): string {
    return JSON.stringify(this.toObject())
  }

  static deserialize(serialized: string): CrewState | null {
    try {
      const data = JSON.parse(serialized)
      if (!isCrewStateData(data)) return null
      return new CrewState(data)
    } catch (_err) { return null }
  }
}

export default CrewState
