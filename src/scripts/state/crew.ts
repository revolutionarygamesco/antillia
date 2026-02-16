import generateID from '../utilities/generate-id.ts'

class CrewState {
  id: string

  constructor() {
    this.id = generateID()
  }

  serialize (): string {
    return JSON.stringify(this)
  }
}

export default CrewState
