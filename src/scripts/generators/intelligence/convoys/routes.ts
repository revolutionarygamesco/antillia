import { MODULE_ID, UUIDS } from '../../../settings.ts'

export interface ConvoyRouteRef {
  uuid: string
  name: string[]
}

interface ConvoyRoute {
  good: ConvoyRouteRef
  origins: ConvoyRouteRef[]
  dests: ConvoyRouteRef[]
  empire: string
  ships: string | number
  escort: string | number
}

const goods: Record<string, ConvoyRouteRef> = {
  ash: {
    uuid: 'Item.lDAchtutyqcPJq1h',
    name: [MODULE_ID, 'intelligence', 'convoys', 'goods', 'ash']
  },
  sugar: {
    uuid: 'Item.Q9clnxDy1Otm00Ed',
    name: [MODULE_ID, 'intelligence', 'convoys', 'goods', 'sugar']
  }
}

const placePrefix = [MODULE_ID, 'places']
const ports: Record<string, ConvoyRouteRef> = {
  basseTerre: {
    uuid: UUIDS.JOURNAL_BASSE_TERRE,
    name: [...placePrefix, 'Basse-Terre']
  },
  basseterre: {
    uuid: UUIDS.JOURNAL_BASSETERRE,
    name: [...placePrefix, 'Basseterre']
  },
  bridgetown: {
    uuid: UUIDS.JOURNAL_BRIDGETOWN,
    name: [...placePrefix, 'Bridgetown']
  },
  bordeaux: {
    uuid: UUIDS.JOURNAL_BORDEAUX,
    name: [...placePrefix, 'Bordeaux']
  },
  cadiz: {
    uuid: UUIDS.JOURNAL_CADIZ,
    name: [...placePrefix, 'Cadiz']
  },
  capFrancais: {
    uuid: UUIDS.JOURNAL_CAP_FRANCAIS,
    name: [...placePrefix, 'Cap-Francais']
  },
  havana: {
    uuid: UUIDS.JOURNAL_HAVANA,
    name: [...placePrefix, 'Havana']
  },
  kingston: {
    uuid: UUIDS.JOURNAL_KINGSTON,
    name: [...placePrefix, 'Kingston']
  },
  laRochelle: {
    uuid: UUIDS.JOURNAL_LA_ROCHELLE,
    name: [...placePrefix, 'La-Rochelle']
  },
  leHavre: {
    uuid: UUIDS.JOURNAL_LE_HAVRE,
    name: [...placePrefix, 'Le-Havre']
  },
  london: {
    uuid: UUIDS.JOURNAL_LONDON,
    name: [...placePrefix, 'London']
  },
  lorient: {
    uuid: UUIDS.JOURNAL_LORIENT,
    name: [...placePrefix, 'Lorient']
  },
  nantes: {
    uuid: UUIDS.JOURNAL_NANTES,
    name: [...placePrefix, 'Nantes']
  },
  stjohn: {
    uuid: UUIDS.JOURNAL_ST_JOHNS,
    name: [...placePrefix, 'St-Johns']
  },
  stpierre: {
    uuid: UUIDS.JOURNAL_ST_PIERRE,
    name: [...placePrefix, 'St-Pierre']
  }
}

const spanishAsh: ConvoyRoute = {
  good: goods.ash,
  origins: [ports.havana],
  dests: [ports.cadiz],
  empire: 'spanish',
  ships: 2,
  escort: 2
}

const britishAsh: ConvoyRoute = {
  good: goods.ash,
  origins: [ports.basseterre, ports.bridgetown, ports.kingston, ports.stjohn],
  dests: [ports.london],
  empire: 'british',
  ships: 2,
  escort: 2
}

const frenchAsh: ConvoyRoute = {
  good: goods.ash,
  origins: [ports.basseTerre, ports.capFrancais, ports.stpierre],
  dests: [ports.lorient],
  empire: 'french',
  ships: 2,
  escort: 2
}

const britishSugar: ConvoyRoute = {
  good: goods.sugar,
  origins: [ports.basseterre, ports.bridgetown, ports.kingston, ports.stjohn],
  dests: [ports.london],
  empire: 'british',
  ships: '1d4',
  escort: '1d2'
}

const frenchSugar: ConvoyRoute = {
  good: goods.sugar,
  origins: [ports.basseTerre, ports.capFrancais, ports.stpierre],
  dests: [ports.bordeaux, ports.laRochelle, ports.leHavre, ports.nantes],
  empire: 'french',
  ships: '1d4',
  escort: '1d2'
}

const routes: ConvoyRoute[] = [
  spanishAsh,
  britishAsh,
  frenchAsh,
  britishSugar,
  britishSugar,
  frenchSugar,
  frenchSugar,
]

export default routes
