import draw from './draw.ts'

const drawFirst = async (uuid: string): Promise<TableResult | null> => {
  const arr = await draw(uuid)
  return arr.length > 0 ? arr[0] : null
}

export default drawFirst
