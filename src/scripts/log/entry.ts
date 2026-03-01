import { type LogEntryData, isLogEntryData } from './data.ts'
import getDay from '../time/day.ts'
import parseHTML from '../utilities/parse-html.ts'
import isObject from '../utilities/guards/object.ts'

class LogEntry {
  at: number
  text: string
  payload?: Record<string, any>

  constructor (data?: LogEntry | Partial<LogEntryData>) {
    this.at = data?.at ?? 0
    this.text = data?.text ?? ''
    this.payload = data?.payload
  }

  get html (): string {
    if (this.text.length < 1 && !this.payload) return ''

    const data: Record<string, string> = {
      at: this.at.toString()
    }

    if (this.payload) data.payload = encodeURIComponent(JSON.stringify(this.payload))
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
    if (this.payload) obj.payload = this.payload
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

  static parse (html: string): LogEntry | null {
    try {
      const doc = parseHTML(html)
      const dt = doc.querySelector('dt')
      const dd = doc.querySelector('dd')
      if (!dt || !dd) return null

      const at = parseInt(dt.dataset.at ?? '0', 10)
      if (isNaN(at)) return null

      const text = dd.hidden ? '' : (dd.textContent ?? '')
      const parsed = dt.dataset.payload
        ? JSON.parse(decodeURIComponent(dt.dataset.payload))
        : undefined
      const payload = isObject(parsed)
        ? parsed as Record<string, any>
        : undefined

      return new LogEntry({ at, text, payload })
    } catch (_err) { return null }
  }
}

export default LogEntry
