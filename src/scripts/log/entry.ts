import { type LogEntryData, isLogEntryData } from './data.ts'
import getDay from '../time/day.ts'

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

  get html (): string {
    if (this.text.length < 1 && !this.location && !this.storyline) return ''

    const data: Record<string, string> = {
      at: this.at.toString()
    }

    if (this.location) data.location = this.location
    if (this.storyline) data.storyline = this.storyline

    if (this.text.length < 0 && Object.keys(data).length < 2) return ''

    const attrs = Object.keys(data)
      .map(key => `data-${key}="${data[key]}"`)
      .join(' ')

    const day = this.text.length > 0
      ? getDay(this.at, { weekday: true })
      : ''

    return this.text.length > 0
      ? `<dt ${attrs}>${day}</dt><dd>${this.text}</dd>`
      : `<dt hidden ${attrs}>${day}</dt><dd hidden></dd>`
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

  static deserialize (serialized: string): LogEntry | null {
    try {
      const data = JSON.parse(serialized)
      if (!isLogEntryData(data)) return null
      return new LogEntry(data)
    } catch (_err) { return null }
  }
}

export default LogEntry
