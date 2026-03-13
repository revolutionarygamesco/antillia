import readLog from './read.ts'

const getPayloads = async <T extends Record<string, any>>(
  guard: (candidate: unknown) => candidate is T,
  filters?: Record<string, any>,
): Promise<T[]> => {
  return (await readLog())
    .map(entry => entry.payload)
    .filter(payload => guard(payload))
    .filter(payload => {
      for (const key in filters) if (payload[key] !== filters[key]) return false
      return true
    })
}

export default getPayloads
