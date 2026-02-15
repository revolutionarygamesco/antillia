const fromUuid = async (uuid: string): Promise<any> => {
  const global = globalThis as any
  if (typeof global.fromUuid === 'function') return await global.fromUuid(uuid)
  throw new Error('fromUuid is not defined in this context.')
}

export default fromUuid
