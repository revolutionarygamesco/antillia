import generateID from '../../utilities/generate-id.ts'
import { type CrewStateData, type CrewPosition, isCrewStateData } from './data.ts'
import fromUuid from '../../utilities/wrappers/from-uuid.ts'

const defaultPositions: Array<[string, CrewPosition]> = [
  ['captain', {
    id: 'captain',
    assigned: [],
    max: 1,
    shares: 2,
    exempt: true,
    exclusive: true,
    required: true
  }],
  ['quartermaster', {
    id: 'quartermaster',
    assigned: [],
    max: 1,
    shares: 1.5,
    exempt: false,
    exclusive: true,
    required: true
  }],
  ['master', {
    id: 'master',
    assigned: [],
    max: 1,
    shares: 1.5,
    exempt: false,
    exclusive: true,
    required: true
  }],
  ['mate1', {
    id: 'mate1',
    assigned: [],
    max: 1,
    shares: 1,
    exempt: false,
    exclusive: true,
    required: false
  }],
  ['mate2', {
    id: 'mate2',
    assigned: [],
    max: 1,
    shares: 1,
    exempt: false,
    exclusive: true,
    required: false
  }],
  ['mate3', {
    id: 'mate3',
    assigned: [],
    max: 1,
    shares: 1,
    exempt: false,
    exclusive: true,
    required: false
  }],
  ['bosun', {
    id: 'bosun',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: true,
    exclusive: true,
    required: false
  }],
  ['gunner', {
    id: 'gunner',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: true,
    exclusive: true,
    required: false
  }],
  ['carpenter', {
    id: 'carpenter',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: true,
    exclusive: true,
    required: false
  }],
  ['surgeon', {
    id: 'surgeon',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: true,
    exclusive: true,
    required: false
  }],
  ['priest', {
    id: 'priest',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: false,
    exclusive: false,
    required: false
  }],
  ['sorcerer', {
    id: 'sorcerer',
    assigned: [],
    max: 1,
    shares: 1.25,
    exempt: false,
    exclusive: false,
    required: false
  }],
  ['cooper', {
    id: 'cooper',
    assigned: [],
    max: 1,
    shares: 1,
    exempt: true,
    exclusive: false,
    required: false
  }],
  ['armorer', {
    id: 'armorer',
    assigned: [],
    max: 1,
    shares: 1,
    exempt: true,
    exclusive: false,
    required: false
  }],
  ['musician', {
    id: 'musician',
    assigned: [],
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false
  }],
  ['sailmaker', {
    id: 'sailmaker',
    assigned: [],
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false
  }],
  ['cook', {
    id: 'cook',
    assigned: [],
    shares: 1,
    exempt: false,
    exclusive: false,
    required: false
  }],
  ['crew', {
    id: 'crew',
    assigned: [],
    shares: 1,
    exempt: false,
    exclusive: false,
    required: true
  }],
  ['land', {
    id: 'land',
    assigned: [],
    shares: 0.75,
    exempt: false,
    exclusive: false,
    required: false
  }]
]

class CrewState {
  id: string
  positions: Map<string, CrewPosition>

  constructor(data?: Partial<CrewStateData>) {
    this.id = typeof data?.id === 'string' ? data.id : generateID()
    this.positions = data?.positions
      ? new Map<string, CrewPosition>(Object.entries(data.positions))
      : new Map<string, CrewPosition>(defaultPositions)
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

  async getCaptain (): Promise<Actor | undefined> {
    const data = this.positions.get('captain')
    if (!data) return undefined
    return fromUuid(`Actor.${data.assigned[0]}`)
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
