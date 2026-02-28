import { type LogEntryData, isLogEntryData } from './data.ts'

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

  toObject (): LogEntryData {
    const obj: LogEntryData = { at: this.at, text: this.text }
    if (this.location) obj.location = this.location
    if (this.storyline) obj.storyline = this.storyline
    return obj
  }

  serialize (): string {
    return JSON.stringify(this.toObject())
  }
}

export default LogEntry
