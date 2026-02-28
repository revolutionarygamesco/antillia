import readLog from './read.ts'
import writeLog from './write.ts'
import LogEntry from './entry.ts'

const addLog = async (
  text: string,
  payload?: object
): Promise<JournalEntry | null> => {
  const entry = new LogEntry({ at: game?.time?.worldTime ?? 0, text, payload })
  const exisiting = await readLog()
  const entries = [...exisiting, entry]
    .sort((a, b) => a.at - b.at)
  return await writeLog(...entries)
}

export default addLog
