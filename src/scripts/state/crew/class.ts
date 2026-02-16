import generateID from '../../utilities/generate-id.ts'
import { type CrewStateData, isCrewStateData } from './data.ts'

class CrewState {
  id: string

  constructor(data?: CrewStateData) {
    this.id = typeof data?.id === 'string' ? data.id : generateID()
  }

  toObject (): CrewStateData {
    return {
      id: this.id
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
