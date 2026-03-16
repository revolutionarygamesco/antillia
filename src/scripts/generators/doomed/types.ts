export interface DoomedSituation {
  tag: string
  complications: string[]
}

export interface DoomedKin {
  name: string
  relationship: string
  location: JournalEntry | string
}

export interface DoomedHandwriting {
  physical: string
  emotional: string
}

export interface DoomedContextAdder {
  test: (scenario: DoomedShip) => boolean,
  adder: (context: Record<string, string>, isPremium: boolean) => void
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
  isHaunted: boolean
  includeMap: boolean
  kin: DoomedKin[]
}
