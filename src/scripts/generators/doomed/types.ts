export interface DoomedSituation {
  tag: string
  complications: string[]
}

export interface DoomedSailor {
  name: string
  position: string
  nationality: string
}

export interface DoomedKin {
  name: string
  relationship: string
  location: JournalEntry | string
  sailor: DoomedSailor
}

export interface DoomedHandwriting {
  physical: string
  emotional: string
}

export interface DoomedContextAdder {
  test: (scenario: DoomedShip) => boolean,
  adder: (context: Record<string, string>, isPremium: boolean) => Promise<void>
}

export interface DoomedShip {
  ship: Actor
  captain: Actor
  author: DoomedSailor
  tale: string
  complication: string
  isHaunted: boolean
  includeMap: boolean
  kin: DoomedKin[]
}
