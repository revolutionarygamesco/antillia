import generateID from '../../utilities/generate-id.ts'
import isObject from '../../utilities/guards/object.ts'

export interface CrewStateData {
  id: string
}

class CrewState {
  id: string

  constructor(data?: Record<string, unknown>) {
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
      if (!isObject(data)) return null
      return new CrewState(data as Record<string, unknown>)
    } catch (_err) { return null }
  }
}

export default CrewState
