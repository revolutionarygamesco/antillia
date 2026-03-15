export interface DoomedSituation {
  tag: string
  complications: string[]
}

export interface DoomedKin {
  name: string
  relationship: string
  location: JournalEntry | string
}

export interface DoomedShip {
  ship: Actor
  captain: Actor
  author: {
    name: string
    position: string
  }
  tale: string
  complication: string
  includeMap: boolean
  kin: DoomedKin[]
}
