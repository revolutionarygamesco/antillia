export interface LogEntryData {
  at: number
  text: string
  location?: string
  storyline?: string
}

class LogEntry {
  at: number
  text: string
  location?: string
  storyline?: string

  constructor (data?: LogEntry | Partial<LogEntryData>) {
    this.at = data?.at ?? 0
    this.text = data?.text ?? ''
    this.location = data?.location ?? undefined
    this.storyline = data?.storyline ?? undefined
  }
}

export default LogEntry
