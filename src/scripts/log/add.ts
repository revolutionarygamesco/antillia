import readLog from './read.ts'
import writeLog from './write.ts'
import LogEntry from './entry.ts'

const addLog = async (
  text: string,
  payload?: Record<string, any>
): Promise<JournalEntry | null> => {
  const entry = new LogEntry({ at: game?.time?.worldTime ?? 0, text, payload })
  const existing = await readLog()
  const entries = [...existing, entry]
    .sort((a, b) => a.at - b.at)
  return await writeLog(...entries)
}

export default addLog
