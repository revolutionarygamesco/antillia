import generateID from '../utilities/generate-id.ts'

class CrewState {
  id: string

  constructor() {
    this.id = generateID()
  }
}

export default CrewState
