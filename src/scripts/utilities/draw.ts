import fromUuid from './wrappers/from-uuid.ts'

const draw = async (uuid: string): Promise<TableResult[]> => {
  try {
    const table = await fromUuid(uuid) as RollTable | null
    if (!table) throw new Error(`Unable to find table ${uuid}`)

    const drawn = await table.draw({ displayChat: false })
    if (!drawn) throw new Error(`Could not draw from table ${uuid}`)

    return drawn.results as TableResult[]
  } catch (_err) {
    return []
  }
}

export default draw
