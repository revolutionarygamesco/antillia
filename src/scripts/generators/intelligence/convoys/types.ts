import { type EmpireData } from '../../../random/empires.ts'

export interface ConvoyRouteRef {
  uuid: string
  name: string[]
}

export interface ConvoyRoute {
  good: ConvoyRouteRef
  origins: ConvoyRouteRef[]
  dests: ConvoyRouteRef[]
  empire: EmpireData
  ships: string | number
  escort: string | number
}

export interface Convoy {
  ships: Actor[]
  escort: Actor[]
  empire: EmpireData
  good: Item
  origin: ConvoyRouteRef
  dest: ConvoyRouteRef
  departure: number
}
