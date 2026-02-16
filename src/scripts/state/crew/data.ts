import isObject from '../../utilities/guards/object.ts'

export interface CrewStateData {
  id: string
}

export const isCrewStateData = (
  candidate: unknown
): candidate is CrewStateData => {
  if (!isObject(candidate)) return false
  const obj = candidate as Record<string, unknown>
  return typeof obj.id === 'string'
}

export const isCrewStateDataArray = (
  candidate: unknown
): candidate is CrewStateData[] => {
  if (!Array.isArray(candidate)) return false
  return candidate.every(obj => isCrewStateData(obj))
}
