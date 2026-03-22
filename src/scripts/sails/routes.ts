import stringUnion, { makeStringUnionGuard } from '../utilities/string-union.ts'
import makeArrayGuard from '../utilities/guards/array.ts'

export const tradeRouteTypes = stringUnion('local', 'sugar', 'logwood', 'slaves')
export type TradeRouteType = typeof tradeRouteTypes[number]
export const isTradeRouteType = makeStringUnionGuard<TradeRouteType>(tradeRouteTypes)
export const isTradeRouteTypeArray = makeArrayGuard<TradeRouteType>(isTradeRouteType)
